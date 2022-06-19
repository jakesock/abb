import { useQuery } from "@apollo/client";
import NextLink from "next/link";
import { GetCurrentUserQuery } from "../../lib/graphql/generated";
import { GET_CURRENT_USER_QUERY } from "../../lib/graphql/queries";
import { LogoutButton } from "./LogoutButton";

export const Navbar: React.FC = () => {
  const { data, loading } = useQuery<GetCurrentUserQuery>(GET_CURRENT_USER_QUERY);

  let body: JSX.Element | null = null;

  if (loading) {
    body = null;
  } else if (!data?.getCurrentUser) {
    body = (
      <>
        <NextLink href="/login">Login</NextLink>
        <NextLink href="/register">Register</NextLink>
      </>
    );
  } else {
    body = <LogoutButton />;
  }

  return (
    <nav>
      <div>BRAND LOGO</div>
      <div>{body}</div>
    </nav>
  );
};
