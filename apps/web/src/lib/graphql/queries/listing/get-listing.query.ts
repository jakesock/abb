import { gql } from "@apollo/client";
import { REGULAR_LISTING_FRAGMENT } from "../../fragments";

export const GET_LISTING_QUERY = gql`
  query GetListing($id: String!) {
    getListing(id: $id) {
      ...RegularListing
    }
  }
  ${REGULAR_LISTING_FRAGMENT}
`;
