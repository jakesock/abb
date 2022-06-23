import { NextPage } from "next";
import { PageLayout } from "../components/PageLayout";
import { SendPasswordResetEmailForm } from "../components/SendPasswordResetEmailForm";

const RequestPasswordResetPage: NextPage = () => (
  <PageLayout heading="Reset Password Request" formPage>
    <SendPasswordResetEmailForm />
  </PageLayout>
);

export default RequestPasswordResetPage;
