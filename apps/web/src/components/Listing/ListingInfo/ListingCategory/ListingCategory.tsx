import { Box, Flex, Text } from "@chakra-ui/react";
import { formatMoney } from "../../../../lib/utils";

interface IListingCategoryProps {
  category: string;
  host: string;
  maxGuests: number;
  numBeds: number;
  pricePerDay: number;
}

export const ListingCategory: React.FC<IListingCategoryProps> = ({
  category,
  host,
  maxGuests,
  numBeds,
  pricePerDay,
}) => (
  <Flex mt={4} justify="space-between" align="center">
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        {category} hosted by {host}
      </Text>
      <Text fontSize="sm" fontWeight="bold" color="gray.500" textTransform="uppercase" mt={1}>
        {maxGuests} {maxGuests > 1 ? "guests" : "guest"} &bull; {numBeds}{" "}
        {numBeds > 1 ? "beds" : "bed"}
      </Text>
    </Box>
    <Flex
      justify="center"
      align="center"
      borderRadius="lg"
      border="1px"
      borderColor="gray.300"
      boxShadow="sm"
      padding={4}
    >
      <Box>
        <Text fontSize="lg" display="inline-block" fontWeight="bold">
          {formatMoney(pricePerDay, "USD").split(".")[0]}
        </Text>{" "}
        <Text fontSize="lg" display="inline-block">
          per night
        </Text>
      </Box>
    </Flex>
  </Flex>
);
