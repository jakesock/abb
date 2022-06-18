import { loginUserSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
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
      {({ isSubmitting, isValid }) => (
        <Form>
          <FormInput
            name="usernameOrEmail"
            label="Username or Email"
            placeholder="Username or Email"
            type="email"
          />
          <FormInput name="password" label="Password" placeholder="Password" password />
          <button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
