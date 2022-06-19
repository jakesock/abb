import type { NextPage } from "next";
import { ConfirmEmailForm } from "../components/ConfirmEmailForm";
import { SendNewConfirmationCodeButton } from "../components/SendNewConfirmationCodeButton";

const ConfirmEmailPage: NextPage = () => (
  <main>
    <div>
      <ConfirmEmailForm />
    </div>
    <div>
      <p>Need a new confirmation code?</p>
      <SendNewConfirmationCodeButton />
    </div>
  </main>
);
export default ConfirmEmailPage;
