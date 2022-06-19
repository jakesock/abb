import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetCurrentUserQuery } from "../../lib/graphql/generated";
import { GET_CURRENT_USER_QUERY } from "../../lib/graphql/queries";

const SettingsPage: NextPage = () => {
  const router = useRouter();
  const { data, loading } = useQuery<GetCurrentUserQuery>(GET_CURRENT_USER_QUERY);

  useEffect(() => {
    if (!data?.getCurrentUser && !loading) {
      // eslint-disable-next-line no-console
      router.push("/login").catch((error) => console.error("[Router Error]:", error));
    }
  }, [data, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Settings</h1>
      <NextLink href="/settings/change-password">Change Password</NextLink>
    </main>
  );
};

export default SettingsPage;
