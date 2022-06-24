import { Box, Heading, Text } from "@chakra-ui/react";

interface IListingDescriptionProps {
  description: string;
}

export const ListingDescription: React.FC<IListingDescriptionProps> = ({ description }) => (
  <Box mt={4}>
    <Heading size="md">About this place</Heading>
    <Text mt={4}>{description}</Text>
  </Box>
);
