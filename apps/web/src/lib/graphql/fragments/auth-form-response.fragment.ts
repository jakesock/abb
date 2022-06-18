import { gql } from "@apollo/client";
import { FIELD_ERROR_FRAGMENT } from "./field-error.fragment";
import { USER_FRAGMENT } from "./user.fragment";

export const AUTH_FORM_RESPONSE_FRAGMENT = gql`
  fragment AuthFormResponseFragment on AuthFormResponse {
    user {
      ...UserFragment
    }
    errors {
      ...FieldErrorFragment
    }
  }
  ${USER_FRAGMENT}
  ${FIELD_ERROR_FRAGMENT}
`;
