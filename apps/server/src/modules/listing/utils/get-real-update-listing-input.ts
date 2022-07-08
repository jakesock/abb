import { Listing } from "../../../entity";
import { UpdateListingInput } from "../inputs";

/**
 * Ensures the values to be used in update functions within the updateListing mutation contain a truthy value.
 * @param {UpdateListingInput} updateListingInput - Input object for the update listing mutation.
 * @param {Listing} listing - Listing to update.
 * @return {Omit<UpdateListingInput, "id" | "newPhoto">} - Mutated input object to be used when providing values to update functions.
 */
export function getRealUpdateListingInput(
  updateListingInput: UpdateListingInput,
  listing: Listing
): Omit<UpdateListingInput, "id" | "newPhoto"> {
  // TODO: REFACTOR TO USE FUNCTION TO KEEP THINGS DRY
  return {
    title: updateListingInput.title ? updateListingInput.title : listing.title,
    description: updateListingInput.description
      ? updateListingInput.description
      : listing.description,
    pricePerNight: updateListingInput.pricePerNight
      ? updateListingInput.pricePerNight
      : listing.pricePerNight,
    numberOfGuests: updateListingInput.numberOfGuests
      ? updateListingInput.numberOfGuests
      : listing.numberOfGuests,
    numberOfBeds: updateListingInput.numberOfBeds
      ? updateListingInput.numberOfBeds
      : listing.numberOfBeds,
    category: updateListingInput.category ? updateListingInput.category : listing.category,
    amenities: updateListingInput.amenities ? updateListingInput.amenities : listing.amenities,
    latitude: updateListingInput.latitude ? updateListingInput.latitude : listing.latitude,
    longitude: updateListingInput.longitude ? updateListingInput.longitude : listing.longitude,
  };
}
