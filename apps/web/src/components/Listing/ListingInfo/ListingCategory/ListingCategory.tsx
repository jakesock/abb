import { Box, Text } from "@chakra-ui/react";

interface IListingCategoryProps {
  category: string;
  host: string;
  maxGuests: number;
  numBeds: number;
}

export const ListingCategory: React.FC<IListingCategoryProps> = ({
  category,
  host,
  maxGuests,
  numBeds,
}) => (
  <Box>
    <Text>
      {category} hosted by {host}
    </Text>
    <Box>
      <Text>
        {maxGuests} {maxGuests > 1 ? "guests" : "guest"} | {numBeds} {numBeds > 1 ? "beds" : "bed"}
      </Text>
    </Box>
  </Box>
);
