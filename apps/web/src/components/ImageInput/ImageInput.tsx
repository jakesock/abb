import { Box, FormControl, FormErrorMessage, FormLabel, Image } from "@chakra-ui/react";
import { useState } from "react";

type ImageInputProps = {
  name: string;
  fieldId: string;
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
  setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void;
};

export const ImageInput: React.FC<ImageInputProps> = ({
  name,
  fieldId,
  label,
  error,
  touched,
  setFieldValue,
}) => {
  const [displayImageUrl, setDisplayImageUrl] = useState<string>("");

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={fieldId}>{label}</FormLabel>
      {displayImageUrl && (
        <Box mt={2}>
          <Image boxSize="full" objectFit="cover" src={displayImageUrl} alt="listing photo" />
        </Box>
      )}
      <Box mt={displayImageUrl ? 4 : 0}>
        <input
          name={name}
          id={fieldId}
          type="file"
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              setDisplayImageUrl(URL.createObjectURL(event.target.files[0]));
              setFieldValue(name, event.target.files[0]);
            }
          }}
        />
      </Box>
      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
