import { Box } from "@chakra-ui/react";

export type WrapperVariant = "xs" | "sm" | "md" | "regular" | "lg" | "xl" | number;

interface IWrapperProps {
  variant?: WrapperVariant;
  children: React.ReactNode;
}

const maxWidthMap = {
  xs: "400px",
  sm: "600px",
  md: "800px",
  regular: "800px",
  lg: "1000px",
  xl: "1200px",
};

export const Wrapper: React.FC<IWrapperProps> = ({ children, variant = "regular" }) => {
  let maxWidth = maxWidthMap.regular;
  maxWidth = typeof variant === "number" ? `${variant}px` : maxWidthMap[variant];

  return (
    <Box as="main" marginX="auto" maxWidth={maxWidth} width="100%">
      {children}
    </Box>
  );
};
