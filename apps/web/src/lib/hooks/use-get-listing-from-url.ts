import { useQuery } from "@apollo/client";
import { GetListingQuery, GetListingQueryVariables } from "../graphql/generated";
import { GET_LISTING_QUERY } from "../graphql/queries";
import { useGetListingId } from "./use-get-listing-id";

/**
 * Get's listing from url.
 * @return {QueryResult<GetListingQuery, Exact<{ id: string }>>} getListing query result from apollo's useQuery hook.
 */
export const useGetListingFromUrl = () => {
  const id = useGetListingId();

  return useQuery<GetListingQuery, GetListingQueryVariables>(GET_LISTING_QUERY, {
    skip: id === -1,
    variables: {
      id: typeof id === "string" ? id : "",
    },
  });
};
