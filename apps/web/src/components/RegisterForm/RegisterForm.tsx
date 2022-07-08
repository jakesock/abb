import { registerUserSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
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
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerUserSchema}
      onSubmit={async (values, { setErrors }) => {
        const response = await registerUser({
          variables: {
            registerUserInput: {
              ...values,
              middleName: values.middleName ? values.middleName : undefined,
            },
          },
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
          router.push("/confirm-email").catch((error) => console.error("[Router Error]:", error));
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormInput type="text" name="username" label="Username" placeholder="Username" />
          <Box mt={4}>
            <FormInput type="text" name="firstName" label="First Name" placeholder="First Name" />
          </Box>
          <Box mt={4}>
            <FormInput
              type="text"
              name="middleName"
              label="Middle Name (Optional)"
              placeholder="Middle Name (optional)"
            />
          </Box>
          <Box mt={4}>
            <FormInput type="text" name="lastName" label="Last Name" placeholder="Last Name" />
          </Box>
          <Box mt={4}>
            <FormInput type="email" name="email" label="Email" placeholder="Email" />
          </Box>
          <Box mt={4}>
            <FormInput
              type="email"
              name="confirmEmail"
              label="Confirm Email"
              placeholder="Confirm Email"
            />
          </Box>
          <Box mt={4}>
            <FormInput type="password" name="password" label="Password" placeholder="Password" />
          </Box>
          <Box mt={4}>
            <FormInput
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
            />
          </Box>
          <Button
            type="submit"
            isLoading={isSubmitting}
            marginTop={4}
            colorScheme="blue"
            width="100%"
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};
