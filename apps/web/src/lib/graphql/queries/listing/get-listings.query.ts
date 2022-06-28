import { gql } from "@apollo/client";
import { REGULAR_LISTING_FRAGMENT } from "../../fragments";

export const GET_LISTINGS_QUERY = gql`
  query GetListings($limit: Int!, $cursor: String) {
    getListings(limit: $limit, cursor: $cursor) {
      listings {
        ...RegularListing
      }
      hasMore
    }
  }
  ${REGULAR_LISTING_FRAGMENT}
`;
