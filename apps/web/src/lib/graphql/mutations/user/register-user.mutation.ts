import { gql } from "@apollo/client";
import { REGULAR_AUTH_FORM_RESPONSE_FRAGMENT } from "../../fragments";

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($registerUserInput: RegisterUserInput!) {
    registerUser(registerUserInput: $registerUserInput) {
      ...RegularAuthFormResponse
    }
  }
  ${REGULAR_AUTH_FORM_RESPONSE_FRAGMENT}
`;
