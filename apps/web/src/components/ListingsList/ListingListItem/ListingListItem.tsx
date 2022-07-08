import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { RegularListingFragment } from "../../../lib/graphql/generated";
import { formatMoney } from "../../../lib/utils";

interface IListingListItemProps {
  listing: RegularListingFragment;
}

export const ListingListItem: React.FC<IListingListItemProps> = ({ listing }) => (
  <NextLink href={`/listings/${listing.id}`}>
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      _hover={{
        boxShadow: "lg",
        cursor: "pointer",
        transform: "scale(1.01)",
      }}
      transition="ease-in-out"
      transitionDuration="100ms"
    >
      <Box>
        <Image
          src={
            listing.pictureUrl
              ? listing.pictureUrl
              : "https://www.pngkey.com/png/detail/233-2332677_ega-png.png"
          }
          alt={`${listing.title} photo`}
          borderTopRadius="lg"
          objectFit="cover"
          boxSize="full"
          maxHeight="250px"
        />
      </Box>

      <Box p={6}>
        <Flex alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="blue">
            {listing.category}
          </Badge>
          <Text
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {listing.numberOfGuests} guests &bull; {listing.numberOfBeds} beds
          </Text>
        </Flex>

        <Text mt={1} fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          {listing.title}
        </Text>

        <Text>
          {formatMoney(listing.pricePerNight * 7, "USD").split(".")[0]}
          <Text as="span" color="gray.600">
            {" "}
            per week
          </Text>
        </Text>

        <Text mt={2} color="gray.600" fontSize="sm">
          Hosted by {listing.host.fullName}
        </Text>
      </Box>
    </Box>
  </NextLink>
);
