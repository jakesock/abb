import { Link, ListItem, UnorderedList } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { PageLayout } from "../../components/PageLayout";
import { useProtectedRoute } from "../../lib/hooks";

const SettingsPage: NextPage = () => {
  const { isLoading } = useProtectedRoute("/login");

  if (isLoading) {
    return null;
  }

  return (
    <PageLayout heading="Settings">
      <UnorderedList>
        <ListItem>
          <NextLink href="/settings/change-password" passHref>
            <Link href="/settings/change-password">Change Password</Link>
          </NextLink>
        </ListItem>
      </UnorderedList>
    </PageLayout>
  );
};

export default SettingsPage;
