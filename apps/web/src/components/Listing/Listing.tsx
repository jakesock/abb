import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetListingQuery, GetListingQueryVariables } from "../../lib/graphql/generated";
import { GET_LISTING_QUERY } from "../../lib/graphql/queries";
import { ListingHeader } from "./ListingHeader";
import { ListingInfo } from "./ListingInfo";

export const Listing: React.FC = () => {
  const [listing, setListing] = useState<GetListingQuery["getListing"] | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery<GetListingQuery, GetListingQueryVariables>(
    GET_LISTING_QUERY,
    { variables: { id: id as string } }
  );

  useEffect(() => {
    if (!loading && data && data.getListing) {
      setListing(data.getListing);
    }
  }, [loading, data]);

  if (loading) {
    return null;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!listing) {
    return <p>Listing not found</p>;
  }

  const {
    id: listingId,
    name,
    category,
    description,
    pictureUrl,
    pricePerDay,
    numberOfBeds,
    maxNumberOfGuests,
    amenities,
    latitude,
    longitude,
    owner,
    createdAt,
    updatedAt,
  } = listing;

  return (
    <Box>
      <ListingHeader
        name={name}
        pictureUrl={pictureUrl}
        latitude={latitude}
        longitude={longitude}
      />
      <ListingInfo
        pricePerDay={pricePerDay}
        category={category}
        description={description}
        numBeds={numberOfBeds}
        maxGuests={maxNumberOfGuests}
        amenities={amenities}
        host={owner.username}
        createdAt={createdAt}
        updatedAt={updatedAt}
        listingId={listingId}
      />
    </Box>
  );
};
