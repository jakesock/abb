import { gql } from "@apollo/client";
import { REGULAR_FIELD_ERROR_FRAGMENT } from "./field-error.fragment";
import { REGULAR_LISTING_FRAGMENT } from "./listing.fragment";

export const REGULAR_LISTING_FORM_RESPONSE_FRAGMENT = gql`
  fragment RegularListingFormResponse on ListingFormResponse {
    listing {
      ...RegularListing
    }
    errors {
      ...RegularFieldError
    }
  }
  ${REGULAR_LISTING_FRAGMENT}
  ${REGULAR_FIELD_ERROR_FRAGMENT}
`;
