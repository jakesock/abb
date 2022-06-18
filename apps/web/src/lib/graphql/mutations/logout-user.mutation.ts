import { gql } from "@apollo/client";

export const LOGOUT_USER_MUTATION = gql`
  mutation LogoutUser {
    logoutUser
  }
`;
