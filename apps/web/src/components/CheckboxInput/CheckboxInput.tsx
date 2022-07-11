import { Checkbox, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const CheckboxInput: React.FC<InputFieldProps> = ({ label, size: _, ...props }) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={!!error && touched}>
      <Checkbox
        {...field}
        {...props}
        aria-invalid={!!error && touched ? true : undefined}
        isChecked={!!field.value}
      >
        {label}
      </Checkbox>
      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
