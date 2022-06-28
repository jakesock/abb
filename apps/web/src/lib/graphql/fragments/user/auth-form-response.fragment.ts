import { gql } from "@apollo/client";
import { REGULAR_FIELD_ERROR_FRAGMENT } from "../common";
import { REGULAR_USER_FRAGMENT } from "./user.fragment";

export const REGULAR_AUTH_FORM_RESPONSE_FRAGMENT = gql`
  fragment RegularAuthFormResponse on AuthFormResponse {
    user {
      ...RegularUser
    }
    errors {
      ...RegularFieldError
    }
  }
  ${REGULAR_USER_FRAGMENT}
  ${REGULAR_FIELD_ERROR_FRAGMENT}
`;
