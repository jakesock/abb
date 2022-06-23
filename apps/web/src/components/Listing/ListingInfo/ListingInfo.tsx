import { Box } from "@chakra-ui/react";
import { ListingAmenities } from "./ListingAmenities";
import { ListingCategory } from "./ListingCategory";
import { ListingDescription } from "./ListingDescription";
import { ListingTimelineDates } from "./ListingTimelineDates";

interface IListingInfoProps {
  category: string;
  host: string;
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
    <ListingCategory category={category} host={host} maxGuests={maxGuests} numBeds={numBeds} />
    <ListingDescription description={description} />
    <ListingAmenities amenities={amenities} listingId={listingId} />
    <ListingTimelineDates createdAt={createdAt} updatedAt={updatedAt} />
  </Box>
);
