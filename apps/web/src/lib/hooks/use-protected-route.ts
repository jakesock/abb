import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetCurrentUserQuery } from "../graphql/generated";
import { GET_CURRENT_USER_QUERY } from "../graphql/queries";

/**
 * A custom hook that redirects a user if they are not logged in.
 * @param {string} redirectPath - Optional path to redirect the user to if they are not logged in. Will only redirect if a path is present.
 * @return {{boolean}} - An object containing a boolean indicating whether the user is logged in or not and if whether the query is loading or not.
 */
export const useProtectedRoute = (redirectPath?: string) => {
  const router = useRouter();
  // TODO: use error state to display error message globally
  const { data, loading } = useQuery<GetCurrentUserQuery>(GET_CURRENT_USER_QUERY);
  const isLoggedIn = !!data?.getCurrentUser;

  useEffect(() => {
    if (!isLoggedIn && !loading && redirectPath) {
      router.replace(redirectPath).catch((error) => {
        // eslint-disable-next-line no-console
        console.error("[Router Error]:", error);
      });
    }
  }, [loading, router, redirectPath, isLoggedIn]);

  return { isLoggedIn: !!data?.getCurrentUser, isLoading: loading };
};
