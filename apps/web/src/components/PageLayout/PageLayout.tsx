import { Box, Heading } from "@chakra-ui/react";
import { Navbar } from "../Navbar";
import { Wrapper } from "../Wrapper";

interface ILayoutProps {
  heading?: string;
  children: React.ReactNode;
  formPage?: boolean;
}

export const PageLayout: React.FC<ILayoutProps> = ({ heading, children, formPage = false }) => (
  <>
    <Navbar />
    <Box marginY={6} paddingX={4}>
      {heading ? (
        <Wrapper variant={formPage ? "md" : "lg"}>
          <Heading size="lg" mb={6}>
            {heading}
          </Heading>
          <Wrapper variant={formPage ? "xs" : "md"}>{children}</Wrapper>
        </Wrapper>
      ) : (
        <Wrapper variant={formPage ? "xs" : "lg"}>{children}</Wrapper>
      )}
    </Box>
  </>
);
