import { gql } from "@apollo/client";

export const REGULAR_LISTING_FRAGMENT = gql`
  fragment RegularListing on Listing {
    id
    name
    category
    description
    pictureUrl
    pricePerDay
    numberOfBeds
    maxNumberOfGuests
    amenities
    latitude
    longitude
    owner {
      username
    }
    createdAt
    updatedAt
  }
`;
