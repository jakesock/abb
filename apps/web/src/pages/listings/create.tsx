import type { NextPage } from "next";
import { CreateListingForm } from "../../components/CreateListingForm";
import { PageLayout } from "../../components/PageLayout";
import { useProtectedRoute } from "../../lib/hooks";

const CreateListingPage: NextPage = () => {
  const { isLoggedIn, isLoading } = useProtectedRoute("/login");

  if (!isLoggedIn || isLoading) {
    return null;
  }

  return (
    <PageLayout heading="Create Listing" formPage>
      <CreateListingForm />
    </PageLayout>
  );
};

export default CreateListingPage;
