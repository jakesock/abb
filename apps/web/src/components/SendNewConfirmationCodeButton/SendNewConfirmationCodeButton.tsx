import { useMutation, useQuery } from "@apollo/client";
import { Button, useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  const TOAST_ID = "send-new-confirmation-code";
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

      if (!toast.isActive(TOAST_ID)) {
        toast({
          id: TOAST_ID,
          title: "Confirmation code sent!",
          description: "Check your email for the new confirmation code.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } else {
      // eslint-disable-next-line no-console
      router.push("/login").catch((error) => console.error("[Router Error]:", error));
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Button
      type="button"
      variant="link"
      marginTop={2}
      marginRight="auto"
      isLoading={loading}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => handleClick()}
    >
      Resend Confirmation Code
    </Button>
  );
};
