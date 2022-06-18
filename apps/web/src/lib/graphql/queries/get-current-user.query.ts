import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../fragments";

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
