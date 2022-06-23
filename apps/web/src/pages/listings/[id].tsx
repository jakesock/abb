import type { NextPage } from "next";
import { Listing } from "../../components/Listing";
import { PageLayout } from "../../components/PageLayout";

const ListingPage: NextPage = () => (
  <PageLayout heading="Listing">
    <Listing />
  </PageLayout>
);

export default ListingPage;
