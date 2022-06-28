import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Listing } from "../../components/Listing";
import { PageLayout } from "../../components/PageLayout";
import { useGetListingFromUrl } from "../../lib/hooks";

const ListingPage: NextPage = () => {
  const { data, error, loading } = useGetListingFromUrl();

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <PageLayout heading="Error">
        <Box>{error.message}</Box>
      </PageLayout>
    );
  }

  if (!data?.getListing) {
    return (
      <PageLayout heading="404 Not Found">
        <Box>Listing not found</Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Listing listing={data.getListing} />
    </PageLayout>
  );
};

export default ListingPage;
