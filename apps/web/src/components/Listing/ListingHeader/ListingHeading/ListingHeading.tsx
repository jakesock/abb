import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { EditDeleteListingButtons } from "../../EditDeleteListingButtons";

interface IListingHeadingProps {
  name: string;
  latitude: number;
  longitude: number;
  listingId: string;
  ownerId: string;
}

export const ListingHeading: React.FC<IListingHeadingProps> = ({
  name,
  latitude,
  longitude,
  listingId,
  ownerId,
}) => (
  <Box>
    <Heading size="lg">{name}</Heading>
    <Flex justify="space-between">
      <Box mt={2}>
        <Text display="inline-block">Location:</Text>{" "}
        <Text fontWeight="bold" display="inline-block">
          {latitude}, {longitude}
        </Text>
      </Box>
      <EditDeleteListingButtons listingId={listingId} ownerId={ownerId} />
    </Flex>
  </Box>
);
