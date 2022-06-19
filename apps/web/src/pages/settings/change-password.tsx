import type { NextPage } from "next";
import { ChangePasswordForm } from "../../components/ChangePasswordForm";
import { PageLayout } from "../../components/PageLayout";
import { useProtectedRoute } from "../../lib/hooks";

const ChangePasswordPage: NextPage = () => {
  const { isLoading } = useProtectedRoute("/login");

  if (isLoading) {
    return null;
  }

  return (
    <PageLayout heading="Change Password">
      <ChangePasswordForm />
    </PageLayout>
  );
};

export default ChangePasswordPage;
