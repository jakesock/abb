import type { NextPage } from "next";
import { ConfirmEmailForm } from "../components/ConfirmEmailForm";
import { PageLayout } from "../components/PageLayout";
import { SendNewConfirmationCodeButton } from "../components/SendNewConfirmationCodeButton";

const ConfirmEmailPage: NextPage = () => (
  <PageLayout heading="Confirm Email" formPage>
    <ConfirmEmailForm />
    <SendNewConfirmationCodeButton />
  </PageLayout>
);
export default ConfirmEmailPage;
