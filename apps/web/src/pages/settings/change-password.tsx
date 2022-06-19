import type { NextPage } from "next";
import { ChangePasswordForm } from "../../components/ChangePasswordForm";
import { useProtectedRoute } from "../../lib/hooks";

const ChangePasswordPage: NextPage = () => {
  const { isLoading } = useProtectedRoute("/login");

  if (isLoading) {
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
