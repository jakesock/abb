// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useQuery } from "@apollo/client";
import { Box, Button, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { ListingList } from "../../components/ListingsList";
import { PageLayout } from "../../components/PageLayout";
import { GetListingsQuery, GetListingsQueryVariables } from "../../lib/graphql/generated";
import { GET_LISTINGS_QUERY } from "../../lib/graphql/queries";

const ListingsPage: NextPage = () => {
  const { data, error, loading, fetchMore, variables } = useQuery<
    GetListingsQuery,
    GetListingsQueryVariables
  >(GET_LISTINGS_QUERY, {
    variables: {
      limit: 4,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <p>Something went wrong with fetching listings.</p>
        {error && <p>Error: {error.message}</p>}
      </div>
    );
  }

  return (
    <PageLayout heading="Listings">
      {!data && loading ? (
        <Box>Loading...</Box>
      ) : (
        <Stack spacing={4}>
          <ListingList listings={data!.getListings.listings} />
        </Stack>
      )}
      {data && data.getListings.hasMore && (
        <Button
          mt={6}
          width="100%"
          colorScheme="blue"
          isLoading={loading}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            await fetchMore({
              variables: {
                limit: variables!.limit,
                cursor: data.getListings.listings[data.getListings.listings.length - 1].createdAt,
              },
            });
          }}
        >
          Load More
        </Button>
      )}
    </PageLayout>
  );
};

export default ListingsPage;
