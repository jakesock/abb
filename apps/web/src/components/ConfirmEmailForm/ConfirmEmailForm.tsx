import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  ConfirmUserEmailMutation,
  ConfirmUserEmailMutationVariables,
} from "../../lib/graphql/generated";
import { CONFIRM_USER_EMAIL_MUTATION } from "../../lib/graphql/mutations";
import { toErrorMap } from "../../lib/utils";
import { FormInput } from "../FormInput";

export const ConfirmEmailForm: React.FC = () => {
  const router = useRouter();
  const [confirmUserEmail] = useMutation<
    ConfirmUserEmailMutation,
    ConfirmUserEmailMutationVariables
  >(CONFIRM_USER_EMAIL_MUTATION);

  return (
    <Formik
      initialValues={{
        code: "",
      }}
      onSubmit={async (variables, { setErrors }) => {
        const response = await confirmUserEmail({
          variables,
        });

        if (response.data?.confirmUserEmail.errors) {
          setErrors(toErrorMap(response.data.confirmUserEmail.errors));
        } else if (response.data?.confirmUserEmail.user) {
          // eslint-disable-next-line no-console
          router.push("/").catch((error) => console.error("[Router Error]:", error));
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormInput name="code" label="Confirmation Code" placeholder="i.e. B2J57HLK" />
          <Button
            type="submit"
            isLoading={isSubmitting}
            marginTop={4}
            colorScheme="blue"
            width="100%"
          >
            Confirm Email
          </Button>
        </Form>
      )}
    </Formik>
  );
};
