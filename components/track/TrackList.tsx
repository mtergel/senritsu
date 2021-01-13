import { Box, Grid } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import Track from "./Track";

interface TrackListProps {
  trackList: any[];
}

const TrackList: React.FC<TrackListProps> = ({ trackList }) => {
  return (
    <>
      <Box
        role="grid"
        border="1px solid transparent"
        outline={0}
        borderRadius={4}
      >
        <AnimateSharedLayout>
          {trackList.map((i, index) => (
            <Track track={i} index={index} key={i.id} />
          ))}
        </AnimateSharedLayout>
      </Box>
    </>
  );
};
export default TrackList;
