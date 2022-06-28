import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { PageLayout } from "../../../components/PageLayout";
import { UpdateListingForm } from "../../../components/UpdateListingForm";
import { useGetListingFromUrl, useProtectedRoute } from "../../../lib/hooks";

const CreateListingPage: NextPage = () => {
  const { isLoggedIn, isLoading } = useProtectedRoute("/login");
  const { data, error, loading: listingLoading } = useGetListingFromUrl();

  if (!isLoggedIn || isLoading || listingLoading) {
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
    <PageLayout heading="Edit Listing" formPage>
      <UpdateListingForm listing={data.getListing} />
    </PageLayout>
  );
};

export default CreateListingPage;
