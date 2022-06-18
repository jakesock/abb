import { gql } from "@apollo/client";

export const REGULAR_USER_FRAGMENT = gql`
  fragment RegularUser on User {
    id
    username
    email
    isConfirmed
    createdAt
    updatedAt
  }
`;
