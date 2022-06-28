import { useRouter } from "next/router";

/**
 * Get's listing id from url.
 * @return {string | number} Listing id or -1 if not found.
 */
export const useGetListingId = () => {
  const router = useRouter();
  const id = router.query.id ? router.query.id : -1;
  return id;
};
