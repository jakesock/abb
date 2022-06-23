import { Box, ListItem, UnorderedList } from "@chakra-ui/react";

interface IListingAmenitiesProps {
  listingId: string;
  amenities: string[];
}

export const ListingAmenities: React.FC<IListingAmenitiesProps> = ({ listingId, amenities }) => (
  <Box>
    <UnorderedList>
      {amenities.map((amenity) => (
        <ListItem key={`${listingId}-${amenity}-amenity`}>{amenity}</ListItem>
      ))}
    </UnorderedList>
  </Box>
);
