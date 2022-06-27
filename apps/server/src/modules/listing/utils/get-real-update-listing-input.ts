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
    name: updateListingInput.name ? updateListingInput.name : listing.name,
    category: updateListingInput.category ? updateListingInput.category : listing.category,
    description: updateListingInput.description
      ? updateListingInput.description
      : listing.description,
    pricePerDay: updateListingInput.pricePerDay
      ? updateListingInput.pricePerDay
      : listing.pricePerDay,
    numberOfBeds: updateListingInput.numberOfBeds
      ? updateListingInput.numberOfBeds
      : listing.numberOfBeds,
    maxNumberOfGuests: updateListingInput.maxNumberOfGuests
      ? updateListingInput.maxNumberOfGuests
      : listing.maxNumberOfGuests,
    amenities: updateListingInput.amenities ? updateListingInput.amenities : listing.amenities,
    latitude: updateListingInput.latitude ? updateListingInput.latitude : listing.latitude,
    longitude: updateListingInput.longitude ? updateListingInput.longitude : listing.longitude,
  };
}
