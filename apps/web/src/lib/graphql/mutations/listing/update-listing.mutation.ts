import { gql } from "@apollo/client";
import { REGULAR_LISTING_FORM_RESPONSE_FRAGMENT } from "../../fragments";

export const UPDATE_LISTING_MUTATION = gql`
  mutation UpdateListing($updateListingInput: UpdateListingInput!) {
    updateListing(updateListingInput: $updateListingInput) {
      ...RegularListingFormResponse
    }
  }
  ${REGULAR_LISTING_FORM_RESPONSE_FRAGMENT}
`;
