import { registerUserSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  GetCurrentUserQuery,
  RegisterUserMutation,
  RegisterUserMutationVariables,
} from "../../lib/graphql/generated";
import { REGISTER_USER_MUTATION } from "../../lib/graphql/mutations";
import { GET_CURRENT_USER_QUERY } from "../../lib/graphql/queries";
import { toErrorMap } from "../../lib/utils";
import { FormInput } from "../FormInput";

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [registerUser] = useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    REGISTER_USER_MUTATION
  );

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerUserSchema}
      onSubmit={async (values, { setErrors }) => {
        const response = await registerUser({
          variables: { registerUserInput: values },
          update: (cache, { data }) => {
            cache.writeQuery<GetCurrentUserQuery>({
              query: GET_CURRENT_USER_QUERY,
              data: {
                getCurrentUser: data?.registerUser.user ? data.registerUser.user : null,
              },
            });
          },
        });

        if (response.data?.registerUser.errors) {
          setErrors(toErrorMap(response.data.registerUser.errors));
        } else if (response.data?.registerUser.user) {
          // eslint-disable-next-line no-console
          router.push("/").catch((error) => console.error("[Router Error]:", error));
        }
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <FormInput name="username" label="Username" placeholder="Username" />
          <FormInput name="email" label="Email" placeholder="Email" />
          <FormInput name="confirmEmail" label="Confirm Email" placeholder="Confirm Email" />
          <FormInput name="password" label="Password" placeholder="Password" password />
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            password
          />
          <button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
