import { InternalServerError, NotAuthorizedError } from "@abb/errors";
import { createListingSchema, updateListingSchema } from "@abb/yup-schemas";
import { Service } from "typedi";
import { Listing } from "../../entity";
import { REAL_MAX_PAGINATED_POSTS_LIMIT } from "../../lib/constants";
import { logger, uploadPhoto, validateFormInput } from "../../lib/utils";
import { FieldError, ListingFormResponse, MyContext, PaginatedListingResponse } from "../../types";
import { CreateListingInput, UpdateListingInput } from "./inputs";
import { getRealUpdateListingInput } from "./utils";

@Service()
/**
 * Represents ListingService, a service providing business logic
 * for the Listing GraphQL Resolver.
 */
export class ListingService {
  /**
   * Finds one listing by id.
   * @param {string} id - The id of the listing to be retrieved.
   * @return {Promise<Listing | null>} - Promise that resolves to the listing with the given id.
   */
  getOne = async (id: string): Promise<Listing | null> => {
    const listing = await Listing.findOne({ where: { id } });
    return listing;
  };

  /**
   * Gets many listings.
   *
   * @param {number} limit - The maximum number of listings to be retrieved.
   * @param {string | null} cursor - The cursor to be used for pagination.
   * @return {Promise<PaginatedListingResponse>} - Promise that resolves to the paginated listings.
   */
  getMany = async (limit: number, cursor: string | null): Promise<PaginatedListingResponse> => {
    const realLimit = Math.min(REAL_MAX_PAGINATED_POSTS_LIMIT, limit);
    const realLimitPlusOne = realLimit + 1;
    const queryBuilder = Listing.createQueryBuilder("l")
      .orderBy('l."created_at"', "DESC")
      .take(realLimitPlusOne);

    if (cursor) {
      queryBuilder.where('l."created_at" < :cursor', {
        cursor: new Date(Number.parseInt(cursor, 10)),
      });
    }

    const listings = await queryBuilder.getMany();

    return {
      listings: listings.slice(0, realLimit),
      hasMore: listings.length === realLimitPlusOne,
    };
  };

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
        ownerId: req.session.userId, // Add user id to listing
        pictureUrl: uploadRes.url, // Add photo url to listing
      }).save();

      return { listing };
    } catch (error) {
      logger.error("Error Creating Listing: %s", error);
      throw new InternalServerError("Error creating listing");
    }
  };

  /**
   * Updates a listing.
   *
   * Validates input, uploads image (if one), and updates a listing.
   * @param {UpdateListingInput} updateListingInput - Input object for the update listing mutation.
   * @param {MyContext} ctx - Our GraphQL context.
   * @return {Promise<ListingFormResponse>} Promise that resolves to a ListingFormResponse.
   */
  update = async (
    updateListingInput: UpdateListingInput,
    { req }: MyContext
  ): Promise<ListingFormResponse> => {
    try {
      // Validate form input
      const errors = await validateFormInput(updateListingInput, updateListingSchema);
      if (errors.length > 0) return { errors };

      // Check Listing exists
      const listing = await Listing.findOne({ where: { id: updateListingInput.id } });
      if (!listing) return { errors: [{ field: "id", message: "Listing not found" }] };

      // User not logged in or user is not the owner of the listing
      if (!req.session.userId || listing.ownerId !== req.session.userId)
        throw new NotAuthorizedError();

      // Ensure that all fields contain a valid value
      const realUpdateListingInput = getRealUpdateListingInput(updateListingInput, listing);

      const photoError: FieldError = {
        field: "newPhoto",
        message: "Something went wrong uploading your photo. Please try again.",
      };

      // Upload new image if one was provided
      if (updateListingInput.newPhoto) {
        const photo = await updateListingInput.newPhoto;
        if (!photo) return { errors: [photoError] }; // Photo is required
        const uploadRes = await uploadPhoto(photo);
        if (!uploadRes) return { errors: [photoError] }; // There was a problem uploading the photo

        // Add new photo url to listing along with rest of input
        Object.assign(listing, {
          ...realUpdateListingInput,
          pictureUrl: uploadRes.url,
        });
      } else {
        Object.assign(listing, realUpdateListingInput);
      }

      // Save listing with changes
      const updatedListing = await listing.save();
      return { listing: updatedListing };
    } catch (error) {
      logger.error("Error Updating Listing: %s", error);
      throw new InternalServerError("Error updating listing");
    }
  };

  /**
   * Deletes a listing.
   *
   * @param {string} id - The id of the listing to be deleted.
   * @param {MyContext} ctx - Our GraphQL context.
   * @return {Promise<boolean>} - Promise that resolves to a boolean indicating whether or not the listing was deleted.
   */
  delete = async (id: string, { req }: MyContext): Promise<boolean> => {
    await Listing.delete({ id, ownerId: req.session.userId });
    return true;
  };
}
