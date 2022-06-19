import { loginUserSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  GetCurrentUserQuery,
  LoginUserMutation,
  LoginUserMutationVariables,
} from "../../lib/graphql/generated";
import { LOGIN_USER_MUTATION } from "../../lib/graphql/mutations";
import { GET_CURRENT_USER_QUERY } from "../../lib/graphql/queries";
import { toErrorMap } from "../../lib/utils";
import { FormInput } from "../FormInput";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loginUser] = useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LOGIN_USER_MUTATION
  );

  return (
    <Formik
      initialValues={{
        usernameOrEmail: "",
        password: "",
      }}
      validationSchema={loginUserSchema}
      onSubmit={async (values, { setErrors }) => {
        const response = await loginUser({
          variables: { loginUserInput: values },
          update: (cache, { data }) => {
            cache.writeQuery<GetCurrentUserQuery>({
              query: GET_CURRENT_USER_QUERY,
              data: {
                getCurrentUser: data?.loginUser.user ? data.loginUser.user : null,
              },
            });
          },
        });

        if (response.data?.loginUser.errors) {
          setErrors(toErrorMap(response.data.loginUser.errors));
        } else if (response.data?.loginUser.user) {
          // eslint-disable-next-line no-console
          router.push("/").catch((error) => console.error("[Router Error]:", error));
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormInput
            type="text"
            name="usernameOrEmail"
            label="Username or Email"
            placeholder="Username or Email"
          />
          <Box mt={4}>
            <FormInput type="password" name="password" label="Password" placeholder="Password" />
          </Box>
          <Button
            type="submit"
            isLoading={isSubmitting}
            marginTop={4}
            colorScheme="blue"
            width="100%"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};
