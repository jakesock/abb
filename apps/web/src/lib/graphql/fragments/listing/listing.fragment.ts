import { gql } from "@apollo/client";

export const REGULAR_LISTING_FRAGMENT = gql`
  fragment RegularListing on Listing {
    id
    title
    description
    pricePerNight
    numberOfGuests
    numberOfBeds
    numberOfBedrooms
    numberOfBathrooms
    hasPrivateBathrooms
    category
    isPetFriendly
    hasSecurityCamera
    hasWeapons
    hasDangerousAnimals
    pictureUrl
    latitude
    longitude
    amenities
    hostId
    host {
      fullName
    }
    createdAt
    updatedAt
  }
`;
