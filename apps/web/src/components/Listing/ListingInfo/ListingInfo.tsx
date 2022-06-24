import { Box, Divider } from "@chakra-ui/react";
import { ListingAmenities } from "./ListingAmenities";
import { ListingCategory } from "./ListingCategory";
import { ListingDescription } from "./ListingDescription";
import { ListingTimelineDates } from "./ListingTimelineDates";

interface IListingInfoProps {
  category: string;
  host: string;
  pricePerDay: number;
  maxGuests: number;
  numBeds: number;
  description: string;
  amenities: string[];
  listingId: string;
  createdAt: string;
  updatedAt: string;
}

export const ListingInfo: React.FC<IListingInfoProps> = ({
  category,
  pricePerDay,
  host,
  maxGuests,
  numBeds,
  description,
  amenities,
  listingId,
  createdAt,
  updatedAt,
}) => (
  <Box>
    <ListingCategory
      pricePerDay={pricePerDay}
      category={category}
      host={host}
      maxGuests={maxGuests}
      numBeds={numBeds}
    />
    <Divider mt={4} />
    <ListingDescription description={description} />
    <Divider mt={4} />
    <ListingAmenities amenities={amenities} listingId={listingId} />
    <Divider mt={4} />
    <ListingTimelineDates createdAt={createdAt} updatedAt={updatedAt} />
  </Box>
);
