import {
  FIRST_LAST_NAME_MAX,
  FIRST_LAST_NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
  USERNAME_MAX,
  USERNAME_MIN,
} from "../constants";

const usernameErrorMessages = {
  tooShort: `Too short! Minimum of ${USERNAME_MIN} characters in length`,
  tooLong: `Too long! Maximum of ${USERNAME_MAX} characters in length`,
  invalidRegEx: 'Username can only contain letters, numbers, and "_"',
};

const nameErrorMessages = {
  tooShort: `Too short! Minimum of ${FIRST_LAST_NAME_MIN} characters in length`,
  tooLong: `Too long! Maximum of ${FIRST_LAST_NAME_MAX} characters in length`,
};

const passwordErrorMessages = {
  tooShort: `Too short! Minimum of ${PASSWORD_MIN} characters in length`,
  tooLong: `Too long! Maximum of ${PASSWORD_MAX} characters in length`,
  invalidRegEx: "Must contain at least one uppercase letter, one lowercase letter, and one number",
};

const emailErrorMessages = {
  invalid: "Invalid Email",
};

export const userErrorMessages = {
  username: {
    ...usernameErrorMessages,
  },
  name: {
    ...nameErrorMessages,
  },
  password: {
    ...passwordErrorMessages,
  },
  email: {
    ...emailErrorMessages,
  },
};
