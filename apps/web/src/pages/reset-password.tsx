import type { NextPage } from "next";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

const ResetPasswordPage: NextPage = () => (
  <main>
    <h1>Reset Password</h1>
    <ResetPasswordForm />
  </main>
);

export default ResetPasswordPage;
