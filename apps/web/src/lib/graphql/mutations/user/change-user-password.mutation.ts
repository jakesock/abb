import { gql } from "@apollo/client";
import { REGULAR_AUTH_FORM_RESPONSE_FRAGMENT } from "../../fragments";

export const CHANGE_USER_PASSWORD_MUTATION = gql`
  mutation ChangeUserPassword($changeUserPasswordInput: ChangeUserPasswordInput!) {
    changeUserPassword(changeUserPasswordInput: $changeUserPasswordInput) {
      ...RegularAuthFormResponse
    }
  }
  ${REGULAR_AUTH_FORM_RESPONSE_FRAGMENT}
`;
