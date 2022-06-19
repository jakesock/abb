import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  SendPasswordResetEmailMutation,
  SendPasswordResetEmailMutationVariables,
} from "../../lib/graphql/generated";
import { SEND_PASSWORD_RESET_EMAIL_MUTATION } from "../../lib/graphql/mutations";
import { FormInput } from "../FormInput";

export const SendPasswordResetEmailForm: React.FC = () => {
  const [alert, setAlert] = useState<string | null>(null);
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

        setAlert(`Email sent to ${values.email}! Check your email for a reset link.`);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <FormInput name="email" label="Email" placeholder="Email" type="email" />
          <button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? "Sending Password Reset Link..." : "Send Password Reset Link"}
          </button>
          <p>{alert}</p>
        </Form>
      )}
    </Formik>
  );
};
