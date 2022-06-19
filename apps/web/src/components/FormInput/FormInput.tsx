import {
  Button,
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";

type InputOrTextarea =
  | ComponentWithAs<"input", InputProps>
  | ComponentWithAs<"textarea", TextareaProps>;

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    // eslint-disable-next-line react/require-default-props
    textarea?: boolean;
  };

export const FormInput: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  type,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  const [show, setShow] = useState(false);
  const handleShowHidePassword = () => setShow(!show);

  let Component: InputOrTextarea = Input;
  if (textarea) {
    Component = Textarea;
  }

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {type === "password" ? (
        <InputGroup size="md">
          <Input
            {...field}
            {...props}
            id={field.name}
            type={show ? "text" : "password"}
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Button type="button" h="1.75rem" size="sm" onClick={handleShowHidePassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Component {...field} {...props} type={type} id={field.name} />
      )}
      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
