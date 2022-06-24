import { Box, Heading, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import { halfArray } from "../../../../lib/utils";

interface IListingAmenitiesProps {
  listingId: string;
  amenities: string[];
}

export const ListingAmenities: React.FC<IListingAmenitiesProps> = ({ listingId, amenities }) => {
  const { firstHalf, secondHalf } = halfArray(amenities);

  return (
    <Box mt={4}>
      <Heading size="md">Amenities</Heading>
      <Box mt={4} width="100%">
        {amenities.length >= 2 ? (
          <Stack direction="row" paddingX={6}>
            <UnorderedList spacing={2} mr="25%">
              {firstHalf.map((amenity) => (
                <ListItem key={`${listingId}-${amenity}-amenity`}>{amenity}</ListItem>
              ))}
            </UnorderedList>
            <UnorderedList spacing={2}>
              {secondHalf.map((amenity) => (
                <ListItem key={`${listingId}-${amenity}-amenity`}>{amenity}</ListItem>
              ))}
            </UnorderedList>
          </Stack>
        ) : (
          <UnorderedList spacing={2} paddingX={6}>
            {amenities.map((amenity) => (
              <ListItem key={`${listingId}-${amenity}-amenity`}>{amenity}</ListItem>
            ))}
          </UnorderedList>
        )}
      </Box>
    </Box>
  );
};
