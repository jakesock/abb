import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";

interface IListingDescriptionProps {
  description: string;
  isPetFriendly: boolean;
  hasSecurityCamera: boolean;
  hasDangerousAnimals: boolean;
  hasWeapons: boolean;
}

export const ListingDescription: React.FC<IListingDescriptionProps> = ({
  description,
  isPetFriendly,
  hasSecurityCamera,
  hasDangerousAnimals,
  hasWeapons,
}) => (
  <Box mt={4}>
    <Heading size="md">About this place</Heading>
    <Text mt={4}>{description}</Text>
    <Box mt={4}>
      <Text color={!isPetFriendly ? "red.500" : undefined} fontWeight="bold">
        This property is {!isPetFriendly && "NOT"} pet friendly!
      </Text>
      {hasSecurityCamera || hasDangerousAnimals || hasWeapons ? (
        <Box mt={2}>
          <Text color={!isPetFriendly ? "red.500" : undefined} fontWeight="bold">
            WARNING: This property contains the following:
          </Text>
          <UnorderedList paddingX={6}>
            {hasDangerousAnimals && <ListItem>Dangerous Animal(s)</ListItem>}
            {hasSecurityCamera && <ListItem>Security camera(s)</ListItem>}
            {hasWeapons && <ListItem>Weapon(s)</ListItem>}
          </UnorderedList>
        </Box>
      ) : null}
    </Box>
  </Box>
);
