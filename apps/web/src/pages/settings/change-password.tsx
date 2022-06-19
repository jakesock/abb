import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ChangePasswordForm } from "../../components/ChangePasswordForm";
import { GetCurrentUserQuery } from "../../lib/graphql/generated";
import { GET_CURRENT_USER_QUERY } from "../../lib/graphql/queries";

const ChangePasswordPage: NextPage = () => {
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
      <h1>Change Password</h1>
      <ChangePasswordForm />
    </main>
  );
};

export default ChangePasswordPage;
