import { Box } from "@chakra-ui/react";
import { RegularListingFragment } from "../../../lib/graphql/generated";
import { ListingHeading } from "./ListingHeading";
import { ListingImage } from "./ListingImage";

interface IListingHeaderProps {
  listing: RegularListingFragment;
}

export const ListingHeader: React.FC<IListingHeaderProps> = ({
  listing: { id, title, latitude, longitude, hostId, pictureUrl },
}) => (
  <Box>
    <ListingHeading
      title={title}
      latitude={latitude}
      longitude={longitude}
      listingId={id}
      hostId={hostId}
    />
    <ListingImage title={title} pictureUrl={pictureUrl} />
  </Box>
);
