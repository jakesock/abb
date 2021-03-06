import { passwordConfirmPasswordValidationSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
import { Box, Button, useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  const TOAST_ID = "reset-password-form-token-error";
  const [token, setToken] = useState("");
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
      validationSchema={passwordConfirmPasswordValidationSchema}
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
            // If the token is invalid, show a toast error, no need to show the field errors as it cannot be submitted successfully anyways
            if (!toast.isActive(TOAST_ID)) {
              toast({
                id: TOAST_ID,
                title: tokenErrorReponse.message,
                description: "Please request a new password reset link.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "bottom-right",
              });
            }
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
      {({ isSubmitting }) => (
        <Form>
          <FormInput type="password" name="password" label="Password" placeholder="New Password" />
          <Box mt={4}>
            <FormInput
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="New Password"
            />
          </Box>
          <Button
            type="submit"
            isLoading={isSubmitting}
            marginTop={4}
            colorScheme="blue"
            width="100%"
          >
            Reset Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};
