import { gql } from "@apollo/client";

export const SEND_NEW_CONFIRMATION_CODE_MUTATION = gql`
  mutation SendNewConfirmationCode($sendNewConfirmationCodeInput: SendNewConfirmationCodeInput!) {
    sendNewConfirmationCode(sendNewConfirmationCodeInput: $sendNewConfirmationCodeInput)
  }
`;
