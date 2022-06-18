import { gql } from "@apollo/client";

export const FIELD_ERROR_FRAGMENT = gql`
  fragment FieldErrorFragment on FieldError {
    field
    message
  }
`;
