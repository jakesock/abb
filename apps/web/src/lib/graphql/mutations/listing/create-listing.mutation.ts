import { gql } from "@apollo/client";
import { REGULAR_LISTING_FORM_RESPONSE_FRAGMENT } from "../../fragments";

export const CREATE_LISTING_MUTATION = gql`
  mutation CreateListing($createListingInput: CreateListingInput!) {
    createListing(createListingInput: $createListingInput) {
      ...RegularListingFormResponse
    }
  }
  ${REGULAR_LISTING_FORM_RESPONSE_FRAGMENT}
`;
