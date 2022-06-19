import { Box } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";

interface IWrapperProps {
  variant?: WrapperVariant;
  children: React.ReactNode;
}

export const Wrapper: React.FC<IWrapperProps> = ({ children, variant = "regular" }) => (
  <Box as="main" marginX="auto" maxWidth={variant === "regular" ? "800px" : "400px"} width="100%">
    {children}
  </Box>
);
