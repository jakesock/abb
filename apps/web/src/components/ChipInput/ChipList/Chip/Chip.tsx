import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

interface IChipProps {
  label: string;
  onCloseClick: (label: string) => void;
}

export const Chip: React.FC<IChipProps> = ({ label, onCloseClick }) => (
  <Tag key={`${label}-chip-tag`} borderRadius="full" variant="solid" colorScheme="blue">
    <TagLabel>{label}</TagLabel>
    <TagCloseButton onClick={() => onCloseClick(label)} />
  </Tag>
);
