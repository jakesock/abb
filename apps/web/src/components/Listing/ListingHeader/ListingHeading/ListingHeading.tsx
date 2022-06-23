import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface IListingHeadingProps {
  name: string;
  latitude: number;
  longitude: number;
  pricePerDay: number;
}

export const ListingHeading: React.FC<IListingHeadingProps> = ({
  name,
  latitude,
  longitude,
  pricePerDay,
}) => (
  <Box>
    <Heading size="lg">{name}</Heading>
    <Flex justify="space-between">
      <Text>
        Location: {latitude}, {longitude}
      </Text>
      <Text>${pricePerDay} per Night</Text>
    </Flex>
  </Box>
);
