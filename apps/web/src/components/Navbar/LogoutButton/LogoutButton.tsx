import { useApolloClient, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { LogoutUserMutation, LogoutUserMutationVariables } from "../../../lib/graphql/generated";
import { LOGOUT_USER_MUTATION } from "../../../lib/graphql/mutations";

export const LogoutButton: React.FC = () => {
  const [logoutUser, { loading: logoutFetching }] = useMutation<
    LogoutUserMutation,
    LogoutUserMutationVariables
  >(LOGOUT_USER_MUTATION);
  const apolloClient = useApolloClient();

  return (
    <Button
      type="button"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => {
        await logoutUser();
        await apolloClient.resetStore();
      }}
    >
      {logoutFetching ? "Logging out..." : "Logout"}
    </Button>
  );
};
