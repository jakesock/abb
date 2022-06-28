import { Box } from "@chakra-ui/react";
import { ListingHeading } from "./ListingHeading";
import { ListingImage } from "./ListingImage";

interface IListingHeaderProps {
  name: string;
  latitude: number;
  longitude: number;
  pictureUrl: string | null | undefined;
  listingId: string;
  ownerId: string;
}

export const ListingHeader: React.FC<IListingHeaderProps> = ({
  name,
  latitude,
  longitude,
  pictureUrl,
  listingId,
  ownerId,
}) => (
  <Box>
    <ListingHeading
      name={name}
      latitude={latitude}
      longitude={longitude}
      listingId={listingId}
      ownerId={ownerId}
    />
    <ListingImage name={name} pictureUrl={pictureUrl} />
  </Box>
);
