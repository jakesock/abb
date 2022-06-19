import { changeUserPasswordSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  ChangeUserPasswordMutation,
  ChangeUserPasswordMutationVariables,
  GetCurrentUserQuery,
} from "../../lib/graphql/generated";
import { CHANGE_USER_PASSWORD_MUTATION } from "../../lib/graphql/mutations";
import { GET_CURRENT_USER_QUERY } from "../../lib/graphql/queries";
import { toErrorMap } from "../../lib/utils";
import { FormInput } from "../FormInput";

export const ChangePasswordForm: React.FC = () => {
  const router = useRouter();
  const [changeUserPassword] = useMutation<
    ChangeUserPasswordMutation,
    ChangeUserPasswordMutationVariables
  >(CHANGE_USER_PASSWORD_MUTATION);

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={changeUserPasswordSchema}
      onSubmit={async (values, { setErrors }) => {
        const response = await changeUserPassword({
          variables: { changeUserPasswordInput: values },
          update: (cache, { data }) => {
            cache.writeQuery<GetCurrentUserQuery>({
              query: GET_CURRENT_USER_QUERY,
              data: {
                getCurrentUser: data?.changeUserPassword.user
                  ? data.changeUserPassword.user
                  : cache.readQuery({ query: GET_CURRENT_USER_QUERY }),
              },
            });
          },
        });

        const user = response.data?.changeUserPassword.user;
        const errors = response.data?.changeUserPassword.errors;

        if (errors) {
          setErrors(toErrorMap(errors));
        } else if (user) {
          // eslint-disable-next-line no-console
          router.push("/").catch((error) => console.error("[Router Error]:", error));
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormInput
            type="password"
            name="oldPassword"
            label="Old Password"
            placeholder="Old Password"
          />
          <Box mt={4}>
            <FormInput
              type="password"
              name="password"
              label="New Password"
              placeholder="New Password"
            />
          </Box>
          <Box mt={4}>
            <FormInput
              type="password"
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm New Password"
            />
          </Box>
          <Button
            type="submit"
            isLoading={isSubmitting}
            marginTop={4}
            colorScheme="blue"
            width="100%"
          >
            Change Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};
