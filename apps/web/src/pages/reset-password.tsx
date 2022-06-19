import type { NextPage } from "next";
import { PageLayout } from "../components/PageLayout";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

const ResetPasswordPage: NextPage = () => (
  <PageLayout heading="Reset Password">
    <ResetPasswordForm />
  </PageLayout>
);

export default ResetPasswordPage;
