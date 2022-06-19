import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  GetCurrentUserQuery,
  ResetUserPasswordMutation,
  ResetUserPasswordMutationVariables,
} from "../../lib/graphql/generated";
import { RESET_USER_PASSWORD_MUTATION } from "../../lib/graphql/mutations";
import { GET_CURRENT_USER_QUERY } from "../../lib/graphql/queries";
import { toErrorMap } from "../../lib/utils";
import { FormInput } from "../FormInput";

export const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [resetUserPassword] = useMutation<
    ResetUserPasswordMutation,
    ResetUserPasswordMutationVariables
  >(RESET_USER_PASSWORD_MUTATION);

  useEffect(() => {
    if (router.query && router.query.token) {
      setToken(router.query.token as string);
    }
  }, [router.query]);

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await resetUserPassword({
          variables: {
            resetUserPasswordInput: {
              token,
              password: values.password,
              confirmPassword: values.confirmPassword,
            },
          },
          update: (cache, { data }) => {
            cache.writeQuery<GetCurrentUserQuery>({
              query: GET_CURRENT_USER_QUERY,
              data: {
                getCurrentUser: data?.resetUserPassword.user ? data.resetUserPassword.user : null,
              },
            });
          },
        });

        const user = response.data?.resetUserPassword.user;
        const errors = response.data?.resetUserPassword.errors;
        if (errors && errors.length > 0) {
          // If there are any field errors, check if the token is invalid
          const tokenErrorReponse = errors.find((error) => error.field === "token");

          if (tokenErrorReponse) {
            // If the token is invalid, display the error message
            // No need to show the password error since the token is invalid and the password cannot change
            setTokenError(tokenErrorReponse.message);
          } else {
            // If the token is valid, show the other errors
            setErrors(toErrorMap(errors));
          }
        } else if (!errors && user) {
          // Password changed and user logged in, redirect to home page
          // eslint-disable-next-line no-console
          router.push("/").catch((error) => console.error("[Router Error]:", error));
        }
      }}
    >
      {({ isSubmitting, isValid }) => (
        <>
          <Form>
            <FormInput name="password" label="Password" placeholder="New Password" password />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="New Password"
              password
            />
            <button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </button>
          </Form>
          {tokenError && <p>{tokenError}</p>}
        </>
      )}
    </Formik>
  );
};
