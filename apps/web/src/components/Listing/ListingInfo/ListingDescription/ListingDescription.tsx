import { Box, Text } from "@chakra-ui/react";

interface IListingDescriptionProps {
  description: string;
}

export const ListingDescription: React.FC<IListingDescriptionProps> = ({ description }) => (
  <Box>
    <Text>{description}</Text>
  </Box>
);
