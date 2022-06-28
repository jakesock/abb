import { Box } from "@chakra-ui/react";
import { RegularListingFragment } from "../../../lib/graphql/generated";
import { ListingHeading } from "./ListingHeading";
import { ListingImage } from "./ListingImage";

interface IListingHeaderProps {
  listing: RegularListingFragment;
}

export const ListingHeader: React.FC<IListingHeaderProps> = ({
  listing: { id, name, latitude, longitude, ownerId, pictureUrl },
}) => (
  <Box>
    <ListingHeading
      name={name}
      latitude={latitude}
      longitude={longitude}
      listingId={id}
      ownerId={ownerId}
    />
    <ListingImage name={name} pictureUrl={pictureUrl} />
  </Box>
);
