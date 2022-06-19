import type { NextPage } from "next";
import NextLink from "next/link";
import { useProtectedRoute } from "../../lib/hooks";

const SettingsPage: NextPage = () => {
  const { isLoading } = useProtectedRoute("/login");

  if (isLoading) {
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
