import { Wrap } from "@chakra-ui/react";
import { Chip } from "./Chip";

interface IChipListProps {
  labels: string[];
  onCloseClick: (label: string) => void;
}

export const ChipList: React.FC<IChipListProps> = ({ labels, onCloseClick }) => (
  <Wrap spacing={2} mb={3}>
    {labels.map((label) => (
      <Chip key={label} label={label} onCloseClick={onCloseClick} />
    ))}
  </Wrap>
);
