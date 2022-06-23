import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type NumberInputProps = InputHTMLAttributes<HTMLInputElement> &
  ChakraNumberInputProps & {
    name: string;
    label: string;
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void;
  };

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  type,
  setFieldValue,
  size: _,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <ChakraNumberInput
        {...props}
        {...field}
        type={type}
        id={field.name}
        onChange={(value) => {
          setFieldValue(field.name, Number(value));
        }}
      >
        <ChakraNumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
