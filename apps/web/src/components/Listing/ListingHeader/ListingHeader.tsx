import { Box } from "@chakra-ui/react";
import { ListingHeading } from "./ListingHeading";
import { ListingImage } from "./ListingImage";

interface IListingHeaderProps {
  name: string;
  latitude: number;
  longitude: number;
  pictureUrl: string | null | undefined;
}

export const ListingHeader: React.FC<IListingHeaderProps> = ({
  name,
  latitude,
  longitude,
  pictureUrl,
}) => (
  <Box>
    <ListingHeading name={name} latitude={latitude} longitude={longitude} />
    <ListingImage name={name} pictureUrl={pictureUrl} />
  </Box>
);
