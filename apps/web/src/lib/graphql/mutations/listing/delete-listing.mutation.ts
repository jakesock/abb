import { gql } from "@apollo/client";

export const DELETE_LISTING_MUTATION = gql`
  mutation DeleteListing($id: String!) {
    deleteListing(id: $id)
  }
`;
