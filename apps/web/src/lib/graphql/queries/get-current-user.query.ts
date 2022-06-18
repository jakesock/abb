import { gql } from "@apollo/client";
import { REGULAR_USER_FRAGMENT } from "../fragments";

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      ...RegularUser
    }
  }
  ${REGULAR_USER_FRAGMENT}
`;
