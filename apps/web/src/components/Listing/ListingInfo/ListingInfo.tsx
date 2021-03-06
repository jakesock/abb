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
    host: { fullName },
    pricePerNight,
    numberOfGuests,
    numberOfBeds,
    numberOfBedrooms,
    numberOfBathrooms,
    hasPrivateBathrooms,
    description,
    isPetFriendly,
    hasWeapons,
    hasDangerousAnimals,
    hasSecurityCamera,
    amenities,
    createdAt,
    updatedAt,
  },
}) => (
  <Box>
    <ListingCategory
      category={category}
      host={fullName}
      pricePerNight={pricePerNight}
      numGuests={numberOfGuests}
      numBeds={numberOfBeds}
      numBedrooms={numberOfBedrooms}
      numBathrooms={numberOfBathrooms}
    />
    <Divider mt={4} />
    <ListingDescription
      description={description}
      isPetFriendly={isPetFriendly}
      hasPrivateBathrooms={hasPrivateBathrooms}
      hasWeapons={hasWeapons}
      hasDangerousAnimals={hasDangerousAnimals}
      hasSecurityCamera={hasSecurityCamera}
    />
    <Divider mt={4} />
    <ListingAmenities amenities={amenities} listingId={id} />
    <Divider mt={4} />
    <ListingTimelineDates createdAt={createdAt} updatedAt={updatedAt} />
  </Box>
);
