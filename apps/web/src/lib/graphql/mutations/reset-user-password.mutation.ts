import { gql } from "@apollo/client";
import { REGULAR_AUTH_FORM_RESPONSE_FRAGMENT } from "../fragments";

export const RESET_USER_PASSWORD_MUTATION = gql`
  mutation ResetUserPassword($resetUserPasswordInput: ResetUserPasswordInput!) {
    resetUserPassword(resetUserPasswordInput: $resetUserPasswordInput) {
      ...RegularAuthFormResponse
    }
  }
  ${REGULAR_AUTH_FORM_RESPONSE_FRAGMENT}
`;
