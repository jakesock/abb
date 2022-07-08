import { gql } from "@apollo/client";

export const REGULAR_LISTING_FRAGMENT = gql`
  fragment RegularListing on Listing {
    id
    title
    description
    pricePerNight
    numberOfGuests
    numberOfBeds
    category
    pictureUrl
    latitude
    longitude
    amenities
    hostId
    host {
      username
    }
    createdAt
    updatedAt
  }
`;
