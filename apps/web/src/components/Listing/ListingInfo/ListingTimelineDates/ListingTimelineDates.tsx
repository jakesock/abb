import { Box, Flex, Text } from "@chakra-ui/react";
import { format, formatDistance } from "date-fns";

interface IListingTimelineDatesProps {
  createdAt: string;
  updatedAt: string;
}

export const ListingTimelineDates: React.FC<IListingTimelineDatesProps> = ({
  createdAt,
  updatedAt,
}) => {
  const formattedCreatedAt = format(Number(createdAt), "MMMM do, yyyy");
  const formattedUpdatedAt = formatDistance(Number(updatedAt), new Date(), { addSuffix: true });

  return (
    <Flex mt={4} justify="space-between">
      <Box mr={4}>
        <Text fontSize="sm" fontWeight="bold">
          Listing Created
        </Text>
        <Text fontSize="sm" fontStyle="italic">
          {formattedCreatedAt}
        </Text>
      </Box>
      {/* {createdAt !== updatedAt && (
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Listing Last Updated
          </Text>
          <Text fontSize="lg" fontStyle="italic">
            {formattedUpdatedAt}
          </Text>
        </Box>
      )} */}
      <Box>
        <Text fontSize="sm" fontWeight="bold">
          Listing Last Updated
        </Text>
        <Text fontSize="sm" fontStyle="italic">
          {formattedUpdatedAt}
        </Text>
      </Box>
    </Flex>
  );
};
