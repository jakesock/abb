import { RegularFieldErrorFragment } from "../graphql/generated";

/**
 * Maps a list of FieldErrorFragment to an object of field names to error messages.
 * @param {RegularFieldErrorFragment[]} errors - An array of field errors.
 * @return {Record<string, string>} - A map of field names to error messages.
 */
export const toErrorMap = (errors: RegularFieldErrorFragment[]): Record<string, string> => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
