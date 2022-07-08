import { useMutation, useQuery } from "@apollo/client";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  DeleteListingMutation,
  DeleteListingMutationVariables,
  GetCurrentUserQuery,
} from "../../../lib/graphql/generated";
import { DELETE_LISTING_MUTATION } from "../../../lib/graphql/mutations";
import { GET_CURRENT_USER_QUERY } from "../../../lib/graphql/queries";

interface IEditDeleteListingButtonsProps {
  listingId: string;
  hostId: string;
}

export const EditDeleteListingButtons: React.FC<IEditDeleteListingButtonsProps> = ({
  listingId,
  hostId,
}) => {
  const { data: currentUserData } = useQuery<GetCurrentUserQuery>(GET_CURRENT_USER_QUERY);
  const [deletePost] = useMutation<DeleteListingMutation, DeleteListingMutationVariables>(
    DELETE_LISTING_MUTATION
  );
  const router = useRouter();

  if (currentUserData?.getCurrentUser?.id !== hostId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/listings/edit/[id]" as={`/listings/edit/${listingId}`} passHref>
        <IconButton
          as={Link}
          colorScheme="blue"
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit listing"
        />
      </NextLink>
      <IconButton
        colorScheme="red"
        icon={<DeleteIcon />}
        aria-label="Delete listing"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await deletePost({
            variables: { id: listingId },
            update: (cache) => {
              cache.evict({ id: `Listing:${listingId}` });
            },
          });

          // eslint-disable-next-line no-console
          router.replace("/").catch((error) => console.error(error));
        }}
      />
    </Box>
  );
};
