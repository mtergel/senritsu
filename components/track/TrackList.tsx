import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";
import Track from "./Track";

interface TrackListProps {
  trackList: any[];
  onClickAdd: (trackURI: string) => void;
  handleReset: () => void;
}

const TrackList: React.FC<TrackListProps> = ({
  trackList,
  onClickAdd,
  handleReset,
}) => {
  const [volume, setVolume] = useState(0.2);
  const handleSetVolume = (value: number) => {
    setVolume(value);
  };

  return (
    <Box
      border="1px solid transparent"
      outline={0}
      borderRadius={4}
      flexGrow={1}
    >
      <Heading size="md" mb={4}>
        Click on the tracks for preview.
      </Heading>
      <AnimateSharedLayout>
        {trackList.map((i, index) => (
          <Track
            track={i}
            index={index + 1}
            key={i.id}
            onClickAdd={onClickAdd}
            volume={volume}
            handleSetVolume={handleSetVolume}
          />
        ))}
        <motion.div layout>
          <Center mt={4}>
            <Heading size="md" textAlign="center" mb={2}>
              Done listenting?
            </Heading>
          </Center>
          <Center>
            <Button variant="ghost" color="purple" onClick={handleReset}>
              Click here to generate new playlist
            </Button>
          </Center>
        </motion.div>
      </AnimateSharedLayout>
    </Box>
  );
};
export default TrackList;
