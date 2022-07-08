import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { EditDeleteListingButtons } from "../../EditDeleteListingButtons";

interface IListingHeadingProps {
  title: string;
  latitude: number;
  longitude: number;
  listingId: string;
  hostId: string;
}

export const ListingHeading: React.FC<IListingHeadingProps> = ({
  title,
  latitude,
  longitude,
  listingId,
  hostId,
}) => (
  <Box>
    <Heading size="lg">{title}</Heading>
    <Flex justify="space-between">
      <Box mt={2}>
        <Text display="inline-block">Location:</Text>{" "}
        <Text fontWeight="bold" display="inline-block">
          {latitude}, {longitude}
        </Text>
      </Box>
      <EditDeleteListingButtons listingId={listingId} hostId={hostId} />
    </Flex>
  </Box>
);
