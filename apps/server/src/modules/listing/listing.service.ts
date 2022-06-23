import { InternalServerError, NotAuthenticatedError, NotAuthorizedError } from "@abb/errors";
import { createListingSchema } from "@abb/yup-schemas";
import { Service } from "typedi";
import { Listing, User } from "../../entity";
import { uploadPhoto, validateFormInput } from "../../lib/utils";
import { FieldError, ListingFormResponse, MyContext } from "../../types";
import { CreateListingInput } from "./inputs";

@Service()
/**
 * Represents ListingService, a service providing business logic
 * for the Listing GraphQL Resolver.
 */
export class ListingService {
  /**
   * Create a new listing.
   *
   * Validates input, uploads image, and creates a new listing.
   * @param {CreateListingInput} createListingInput - Input object for the create listing mutation.
   * @param {MyContext} ctx - Our GraphQL context.
   * @return {Promise<ListingFormResponse>} Promise that resolves to a ListingFormResponse.
   */
  create = async (
    createListingInput: CreateListingInput,
    { req }: MyContext
  ): Promise<ListingFormResponse> => {
    try {
      // Double check user is authenticated
      const { userId } = req.session;
      if (!userId) {
        throw new NotAuthenticatedError(); // User not logged in
      }

      // Get user from database
      const user = await User.findOneBy({ id: userId });
      if (!user) {
        throw new NotAuthorizedError(); // Invalid session, user id, or user deleted
      }

      // Validate form input
      const errors = await validateFormInput(createListingInput, createListingSchema);
      if (errors.length > 0) {
        return { errors };
      }

      const photoError: FieldError = {
        field: "photo",
        message: "Something went wrong uploading your photo. Please try again.",
      };

      // Upload image
      const photo = await createListingInput.photo;
      if (!photo) return { errors: [photoError] }; // Photo is required
      const uploadRes = await uploadPhoto(photo);
      if (!uploadRes) return { errors: [photoError] }; // There was a problem uploading the photo

      const listing = await Listing.create({
        ...createListingInput,
        owner: user, // Add user to listing
        ownerId: userId, // Add user id to listing
        pictureUrl: uploadRes.url, // Add photo url to listing
      }).save();

      return { listing };
    } catch {
      throw new InternalServerError("Error creating listing");
    }
  };
}
