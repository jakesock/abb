import { capitalizeFirstLetter } from "@abb/utils";

export const commonErrorMessages = {
  required: "Required",
  fieldsDoNotMatch: (fieldsName: string) => `${capitalizeFirstLetter(fieldsName)} must match`,
  invalidToken: "Invalid or expired token",
};
