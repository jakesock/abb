import type { NextPage } from "next";
import NextLink from "next/link";
import { LoginForm } from "../components/LoginForm";

const LoginPage: NextPage = () => (
  <div>
    <main>
      <LoginForm />
      <div>
        <NextLink href="/request-password-reset">Forgot Password</NextLink>
      </div>
    </main>
  </div>
);

export default LoginPage;
