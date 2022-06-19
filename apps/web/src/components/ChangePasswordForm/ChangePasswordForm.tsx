import { changeUserPasswordSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
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
      {({ isSubmitting, isValid }) => (
        <Form>
          <FormInput name="oldPassword" label="Old Password" placeholder="Old Password" password />
          <FormInput name="password" label="New Password" placeholder="New Password" password />
          <FormInput
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm New Password"
            password
          />
          <button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? "Changing Password..." : "Change Password"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
