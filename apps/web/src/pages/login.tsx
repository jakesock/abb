import { Box, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { LoginForm } from "../components/LoginForm";
import { PageLayout } from "../components/PageLayout";

const LoginPage: NextPage = () => (
  <PageLayout heading="Login" formPage>
    <LoginForm />
    <Box mt={2}>
      <NextLink href="/request-password-reset" passHref>
        <Link href="/request-password-reset">Forgot Password</Link>
      </NextLink>
    </Box>
  </PageLayout>
);

export default LoginPage;
