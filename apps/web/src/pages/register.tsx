import type { NextPage } from "next";
import { PageLayout } from "../components/PageLayout";
import { RegisterForm } from "../components/RegisterForm";

const RegisterPage: NextPage = () => (
  <PageLayout heading="Register" formPage>
    <RegisterForm />
  </PageLayout>
);

export default RegisterPage;
