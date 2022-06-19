import { Box, Heading } from "@chakra-ui/react";
import { Navbar } from "../Navbar";
import { Wrapper } from "../Wrapper";

interface ILayoutProps {
  heading: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<ILayoutProps> = ({ heading, children }) => (
  <>
    <Navbar />
    <Box marginTop={6} paddingX={4}>
      <Wrapper variant="regular">
        <Heading size="lg" mb={6}>
          {heading}
        </Heading>
        <Wrapper variant="small">{children}</Wrapper>
      </Wrapper>
    </Box>
  </>
);
