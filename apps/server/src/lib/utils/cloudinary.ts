import cloudinary, { UploadApiResponse } from "cloudinary";
import "dotenv/config";
import type { FileUpload } from "graphql-upload";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryImage {
  url: string;
  publicId: string;
}

type UploadPhotoResponse = CloudinaryImage | undefined;

/**
 * Creates a promise that pipes a readable stream of the file upload to cloudinary's upload stream function.
 * @param {FileUpload} photo - The photo to upload to cloudinary.
 * @return {Promise<UploadApiResponse>} Promise that resolves to a cloudinary.UploadApiResponse
 */
const processPhotoUpload = async (photo: FileUpload): Promise<UploadApiResponse> =>
  new Promise((resolve, reject) => {
    photo.createReadStream().pipe(
      cloudinary.v2.uploader.upload_stream({ upload_preset: "abb" }, (error, result) => {
        if (result) {
          resolve(result);
        }
        reject(error);
      })
    );
  });

/**
 * Uploads a photo to Cloudinary and returns the public id and url.
 * @param {FileUpload} photo - Image file to upload
 * @return {Promise<UploadPhotoResponse>} - Promise that resolves to the uploaded image's public id and url.
 */
export const uploadPhoto = async (photo: FileUpload): Promise<UploadPhotoResponse> => {
  const { url, public_id: publicId } = await processPhotoUpload(photo);
  if (url && publicId) {
    return {
      url,
      publicId,
    };
  }

  return undefined;
};

export { default as cloudinary } from "cloudinary";
