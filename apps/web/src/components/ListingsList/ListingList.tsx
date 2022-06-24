import { Center, SimpleGrid } from "@chakra-ui/react";
import { RegularListingFragment } from "../../lib/graphql/generated";
import { ListingListItem } from "./ListingListItem";

interface IListingListProps {
  listings: RegularListingFragment[];
}

export const ListingList: React.FC<IListingListProps> = ({ listings }) => (
  <Center>
    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
      {listings.map((listing) =>
        !listing ? null : (
          <ListingListItem key={`${listing.id}-listing-list-item`} listing={listing} />
        )
      )}
    </SimpleGrid>
  </Center>
);
