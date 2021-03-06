import { registerUserSchema } from "@abb/yup-schemas";
import { User } from "../../../entity";
import { validateFormInput } from "../../../lib/utils";
import { FieldError } from "../../../types";
import { emailTakenErrorMessage, usernameTakenErrorMessage } from "../error-messages";
import { RegisterUserInput } from "../inputs";

/**
 * Validates register form input and checks for duplicate username or email.
 * @param {RegisterUserInput} registerUserInput - Object of type RegisterUserInput
 * @return {FieldError[]} An array of field errors
 */
export async function validateRegister(
  registerUserInput: RegisterUserInput
): Promise<FieldError[]> {
  // Check input against schema
  const errors = await validateFormInput(registerUserInput, registerUserSchema);

  // Check for duplicate username
  const existingUsername = await User.findOne({ where: { username: registerUserInput.username } });
  if (existingUsername) {
    errors.push({
      field: "username",
      message: usernameTakenErrorMessage,
    });
  }

  // Check for duplicate email
  const existingEmail = await User.findOne({ where: { email: registerUserInput.email } });
  if (existingEmail) {
    errors.push({
      field: "email",
      message: emailTakenErrorMessage,
    });
  }

  return errors;
}
