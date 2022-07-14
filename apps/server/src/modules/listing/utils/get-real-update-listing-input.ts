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
  const realUpdateListingInput = {
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
    numberOfBedrooms: updateListingInput.numberOfBedrooms
      ? updateListingInput.numberOfBedrooms
      : listing.numberOfBedrooms,
    numberOfBathrooms: updateListingInput.numberOfBathrooms
      ? updateListingInput.numberOfBathrooms
      : listing.numberOfBathrooms,
    hasPrivateBathrooms: !!updateListingInput.hasPrivateBathrooms,
    category: updateListingInput.category ? updateListingInput.category : listing.category,
    isPetFriendly: !!updateListingInput.isPetFriendly,
    hasSecurityCamera: !!updateListingInput.hasSecurityCamera,
    hasWeapons: !!updateListingInput.hasWeapons,
    hasDangerousAnimals: !!updateListingInput.hasDangerousAnimals,
    amenities: updateListingInput.amenities ? updateListingInput.amenities : listing.amenities,
    latitude: updateListingInput.latitude ? updateListingInput.latitude : listing.latitude,
    longitude: updateListingInput.longitude ? updateListingInput.longitude : listing.longitude,
  };

  return realUpdateListingInput;
}
