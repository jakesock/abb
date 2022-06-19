import { NextPage } from "next";
import { SendPasswordResetEmailForm } from "../components/SendPasswordResetEmailForm";

const RequestPasswordResetPage: NextPage = () => (
  <main>
    <SendPasswordResetEmailForm />
  </main>
);

export default RequestPasswordResetPage;
