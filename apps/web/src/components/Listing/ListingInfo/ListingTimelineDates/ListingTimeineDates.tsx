import { Box, Text } from "@chakra-ui/react";

interface IListingTimelineDatesProps {
  createdAt: string;
  updatedAt: string;
}

export const ListingTimelineDates: React.FC<IListingTimelineDatesProps> = ({
  createdAt,
  updatedAt,
}) => (
  <Box>
    <Text>Listing created on {createdAt}</Text>
    {createdAt !== updatedAt && <Text>Listing last updated {updatedAt}</Text>}
  </Box>
);
