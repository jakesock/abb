import { gql } from "@apollo/client";
import { REGULAR_AUTH_FORM_RESPONSE_FRAGMENT } from "../../fragments";

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      ...RegularAuthFormResponse
    }
  }
  ${REGULAR_AUTH_FORM_RESPONSE_FRAGMENT}
`;
