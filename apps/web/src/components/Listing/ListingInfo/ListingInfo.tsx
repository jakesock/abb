import { Box, Divider } from "@chakra-ui/react";
import { RegularListingFragment } from "../../../lib/graphql/generated";
import { ListingAmenities } from "./ListingAmenities";
import { ListingCategory } from "./ListingCategory";
import { ListingDescription } from "./ListingDescription";
import { ListingTimelineDates } from "./ListingTimelineDates";

interface IListingInfoProps {
  listing: RegularListingFragment;
}

export const ListingInfo: React.FC<IListingInfoProps> = ({
  listing: {
    id,
    category,
    host: { username },
    pricePerNight,
    numberOfGuests,
    numberOfBeds,
    description,
    amenities,
    createdAt,
    updatedAt,
  },
}) => (
  <Box>
    <ListingCategory
      category={category}
      host={username}
      pricePerNight={pricePerNight}
      numGuests={numberOfGuests}
      numBeds={numberOfBeds}
    />
    <Divider mt={4} />
    <ListingDescription description={description} />
    <Divider mt={4} />
    <ListingAmenities amenities={amenities} listingId={id} />
    <Divider mt={4} />
    <ListingTimelineDates createdAt={createdAt} updatedAt={updatedAt} />
  </Box>
);
