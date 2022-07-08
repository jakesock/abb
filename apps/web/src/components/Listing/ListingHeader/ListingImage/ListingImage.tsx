import { Box, Image } from "@chakra-ui/react";

interface IListingImageProps {
  title: string;
  pictureUrl: string | null | undefined;
}

export const ListingImage: React.FC<IListingImageProps> = ({ title, pictureUrl }) => (
  <Box mt={4}>
    <Image
      src={pictureUrl || "https://www.pngkey.com/png/detail/233-2332677_ega-png.png"}
      alt={pictureUrl ? `Photo of ${title}` : `No image found for ${title}`}
      borderRadius="lg"
    />
  </Box>
);
