import { useMutation } from "@apollo/client";
import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  SendPasswordResetEmailMutation,
  SendPasswordResetEmailMutationVariables,
} from "../../lib/graphql/generated";
import { SEND_PASSWORD_RESET_EMAIL_MUTATION } from "../../lib/graphql/mutations";
import { FormInput } from "../FormInput";

export const SendPasswordResetEmailForm: React.FC = () => {
  const toast = useToast();
  const TOAST_ID = "send-password-reset-email";
  const [sendPasswordResetEmail] = useMutation<
    SendPasswordResetEmailMutation,
    SendPasswordResetEmailMutationVariables
  >(SEND_PASSWORD_RESET_EMAIL_MUTATION);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await sendPasswordResetEmail({
          variables: {
            email: values.email,
          },
        });

        if (!toast.isActive(TOAST_ID)) {
          toast({
            id: TOAST_ID,
            title: `Email sent to ${values.email}!`,
            description: "Make sure to check your email for a link to reset your password.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormInput name="email" label="Email" placeholder="Email" type="email" />
          <Button
            type="submit"
            isLoading={isSubmitting}
            marginTop={4}
            colorScheme="blue"
            width="100%"
          >
            Send Password Reset Link
          </Button>
        </Form>
      )}
    </Formik>
  );
};
