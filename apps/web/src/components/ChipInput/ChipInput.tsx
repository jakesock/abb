import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, useState } from "react";
import { ChipList } from "./ChipList";

type ChipInputProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    name: string;
    inputLabel: string;
    placeholder: string;
    initialLabels?: string[];
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void;
  };

export const ChipInput: React.FC<ChipInputProps> = ({
  inputLabel,
  placeholder,
  setFieldValue,
  size: _,
  initialLabels = [],
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  const [inputValue, setInputValue] = useState("");
  const [labels, setLabels] = useState(initialLabels);

  const labelExists = (label: string) => labels.includes(label);

  const addLabels = (labelsToAdd: string[]) => {
    const validLabels = labelsToAdd
      .map((label) => label.trim())
      .filter((label) => !labelExists(label));
    const newLabels = [...labels, ...validLabels];
    setLabels(newLabels);
    setFieldValue(field.name, newLabels);
    setInputValue("");
  };

  const removeLabel = (label: string) => {
    const labelIndex = labels.indexOf(label);
    if (labelIndex !== -1) {
      const newLabels = [...labels];
      newLabels.splice(labelIndex, 1);
      setLabels(newLabels);
      setFieldValue(field.name, newLabels);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Tab", ","].includes(event.key)) {
      event.preventDefault();
      addLabels([inputValue]);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedData = event.clipboardData.getData("text");
    const pastedLabels = pastedData.split(",").map((label) => label.trim());
    addLabels(pastedLabels);
  };

  const handleCloseClick = (label: string) => {
    removeLabel(label);
  };

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={field.name}>{inputLabel}</FormLabel>
      {labels.length > 0 ? <ChipList labels={labels} onCloseClick={handleCloseClick} /> : null}
      <Input
        {...field}
        {...props}
        type="text"
        id={field.name}
        placeholder={placeholder}
        onPaste={handlePaste}
        onKeyDown={handleInputKeyDown}
        onChange={handleInputChange}
        value={inputValue}
      />
      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
