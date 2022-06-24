import { Box, Heading, Text } from "@chakra-ui/react";

interface IListingHeadingProps {
  name: string;
  latitude: number;
  longitude: number;
}

export const ListingHeading: React.FC<IListingHeadingProps> = ({ name, latitude, longitude }) => (
  <Box>
    <Heading size="lg">{name}</Heading>
    <Box mt={2}>
      <Text display="inline-block">Location:</Text>{" "}
      <Text fontWeight="bold" display="inline-block">
        {latitude}, {longitude}
      </Text>
    </Box>
  </Box>
);
