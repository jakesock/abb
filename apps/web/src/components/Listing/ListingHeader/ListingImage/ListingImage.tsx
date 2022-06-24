import { Box, Image } from "@chakra-ui/react";

interface IListingImageProps {
  name: string;
  pictureUrl: string | null | undefined;
}

export const ListingImage: React.FC<IListingImageProps> = ({ name, pictureUrl }) => (
  <Box mt={4}>
    <Image
      src={pictureUrl || "https://www.pngkey.com/png/detail/233-2332677_ega-png.png"}
      alt={pictureUrl ? `Photo of ${name}` : `No image found for ${name}`}
      borderRadius="lg"
    />
  </Box>
);
