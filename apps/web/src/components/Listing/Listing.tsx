import { Box } from "@chakra-ui/react";
import { RegularListingFragment } from "../../lib/graphql/generated";
import { ListingHeader } from "./ListingHeader";
import { ListingInfo } from "./ListingInfo";

interface IListingProps {
  listing: RegularListingFragment;
}

export const Listing: React.FC<IListingProps> = ({ listing }) => (
  <Box>
    <ListingHeader listing={listing} />
    <ListingInfo listing={listing} />
  </Box>
);
