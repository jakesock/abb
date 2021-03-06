import { useQuery } from "@apollo/client";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { GetCurrentUserQuery } from "../../lib/graphql/generated";
import { GET_CURRENT_USER_QUERY } from "../../lib/graphql/queries";
import { LogoutButton } from "./LogoutButton";

export const Navbar: React.FC = () => {
  const { data, loading } = useQuery<GetCurrentUserQuery>(GET_CURRENT_USER_QUERY);

  let body: JSX.Element | null = null;

  if (loading) {
    body = null;
  } else if (!data?.getCurrentUser) {
    body = (
      <>
        <NextLink href="/login" passHref>
          <Link href="/login" mr={4}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register" passHref>
          <Link href="/register">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/listings/create" passHref>
          <Link href="/listings/create" mr={4}>
            Create Listing
          </Link>
        </NextLink>
        <NextLink href="/settings" passHref>
          <Link href="/settings" mr={4}>
            Settings
          </Link>
        </NextLink>
        <LogoutButton />
      </Flex>
    );
  }

  return (
    <Flex bg="gray.50" boxShadow="md" zIndex={1} position="sticky" top={0} p={4}>
      <Flex flex={1} m="auto" align="center" maxW={1000}>
        <Flex align="center">
          <NextLink href="/" passHref>
            <Link href="/" mr={4}>
              <Heading size="md">Vacay!</Heading>
            </Link>
          </NextLink>
          {data?.getCurrentUser?.username && (
            <Text mr={4}>Welcome back, {data.getCurrentUser.username}!</Text>
          )}
        </Flex>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};
