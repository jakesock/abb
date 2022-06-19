import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  GetCurrentUserQuery,
  SendNewConfirmationCodeMutation,
  SendNewConfirmationCodeMutationVariables,
} from "../../lib/graphql/generated";
import { SEND_NEW_CONFIRMATION_CODE_MUTATION } from "../../lib/graphql/mutations";
import { GET_CURRENT_USER_QUERY } from "../../lib/graphql/queries";

export const SendNewConfirmationCodeButton: React.FC = () => {
  const router = useRouter();
  const { data } = useQuery<GetCurrentUserQuery>(GET_CURRENT_USER_QUERY);
  const [sendNewConfirmationCode, { loading }] = useMutation<
    SendNewConfirmationCodeMutation,
    SendNewConfirmationCodeMutationVariables
  >(SEND_NEW_CONFIRMATION_CODE_MUTATION);

  const handleClick = async () => {
    if (data?.getCurrentUser?.id && data?.getCurrentUser.email) {
      await sendNewConfirmationCode({
        variables: {
          sendNewConfirmationCodeInput: {
            userId: data.getCurrentUser.id,
            userEmail: data.getCurrentUser.email,
          },
        },
      });
    } else {
      // eslint-disable-next-line no-console
      router.push("/login").catch((error) => console.error("[Router Error]:", error));
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <button type="button" onClick={async () => handleClick()} disabled={loading}>
      {loading ? "Sending Confirmation Code..." : "Resend Confirmation Code"}
    </button>
  );
};
