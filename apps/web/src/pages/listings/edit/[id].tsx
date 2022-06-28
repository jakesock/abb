import type { NextPage } from "next";
import { PageLayout } from "../../../components/PageLayout";
import { UpdateListingForm } from "../../../components/UpdateListingForm";
import { useProtectedRoute } from "../../../lib/hooks";

const CreateListingPage: NextPage = () => {
  const { isLoggedIn, isLoading } = useProtectedRoute("/login");

  if (!isLoggedIn || isLoading) {
    return null;
  }

  return (
    <PageLayout heading="Create Listing" formPage>
      <UpdateListingForm />
    </PageLayout>
  );
};

export default CreateListingPage;
