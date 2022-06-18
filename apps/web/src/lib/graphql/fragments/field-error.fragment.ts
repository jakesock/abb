import { gql } from "@apollo/client";

export const REGULAR_FIELD_ERROR_FRAGMENT = gql`
  fragment RegularFieldError on FieldError {
    field
    message
  }
`;
