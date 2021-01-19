import { Box, Heading } from "@chakra-ui/react";
import { AnimateSharedLayout } from "framer-motion";
import React from "react";
import Track from "./Track";

interface TrackListProps {
  trackList: any[];
  onClickAdd: (trackURI: string) => void;
}

const TrackList: React.FC<TrackListProps> = ({ trackList, onClickAdd }) => {
  return (
    <>
      <Box
        role="grid"
        border="1px solid transparent"
        outline={0}
        borderRadius={4}
      >
        <Heading size="md" mb={4}>
          Hover over the tracks for preview.
        </Heading>
        <AnimateSharedLayout>
          {trackList.map((i, index) => (
            <Track track={i} index={index} key={i.id} onClickAdd={onClickAdd} />
          ))}
        </AnimateSharedLayout>
      </Box>
    </>
  );
};
export default TrackList;
