import type { NextPage } from "next";
import { ChangePasswordForm } from "../../components/ChangePasswordForm";
import { PageLayout } from "../../components/PageLayout";
import { useProtectedRoute } from "../../lib/hooks";

const ChangePasswordPage: NextPage = () => {
  const { isLoggedIn, isLoading } = useProtectedRoute("/login");

  if (!isLoggedIn || isLoading) {
    return null;
  }

  return (
    <PageLayout heading="Change Password" formPage>
      <ChangePasswordForm />
    </PageLayout>
  );
};

export default ChangePasswordPage;
