import { gql } from "@apollo/client";
import { REGULAR_AUTH_FORM_RESPONSE_FRAGMENT } from "../fragments";

export const CONFIRM_USER_EMAIL_MUTATION = gql`
  mutation ConfirmUserEmail($code: String!) {
    confirmUserEmail(code: $code) {
      ...RegularAuthFormResponse
    }
  }
  ${REGULAR_AUTH_FORM_RESPONSE_FRAGMENT}
`;
