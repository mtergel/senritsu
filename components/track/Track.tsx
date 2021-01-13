import {
  Badge,
  Box,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { msConvertor } from "../../lib/helper/msConvertor";
import ReactPlayer from "react-player/lazy";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Track.module.css";
interface TrackProps {
  index?: string | number;
  track: any;
}

const Track: React.FC<TrackProps> = ({ index, track }) => {
  const [playing, setPlaying] = useState(false);
  const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout | null>(null);

  const setPlayingTrue = () => {
    setDelayHandler(
      setTimeout(() => {
        setPlaying(true);
      }, 800)
    );
  };
  const setPlayingFalse = () => {
    setPlaying(false);
    clearTimeout(delayHandler);
  };
  const [volume, setVolume] = useState(0.2);
  const handleSetVolume = (value: number) => {
    setVolume(value);
  };

  if (track) {
    const trackLen = msConvertor(track.duration_ms);
    return (
      <motion.div
        layout
        onMouseEnter={() => setPlayingTrue()}
        onMouseLeave={() => setPlayingFalse()}
        className={styles.track}
        transition={{ duration: 0.4 }}
      >
        <motion.div layout className={styles.trackGrid}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            role="gridcell"
            aria-colindex={1}
            tabIndex={-1}
          >
            <Heading size="sm">{`${index}.`}</Heading>
          </Box>
          <Box
            role="gridcell"
            aria-colindex={2}
            tabIndex={-1}
            display="flex"
            alignItems="center"
          >
            <Flex pr={"8px"} justifyContent="flex-start" flexDir="column">
              <Heading size="sm" isTruncated justifySelf="start" mb={1.8}>
                {track.name}
              </Heading>
              <Flex>
                {track.explicit && (
                  <Badge colorScheme="purple" mr={2}>
                    Explicit
                  </Badge>
                )}
                <Flex fontSize="sm" isTruncated>
                  {track.artists.map((a) => a.name).join(", ")}
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Box
            role="gridcell"
            aria-colindex={3}
            tabIndex={-1}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <div>{trackLen}</div>
          </Box>
        </motion.div>
        <AnimatePresence>
          {playing && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: {
                  delay: 0.2,
                },
              }}
            >
              <Text mr={4}>Preview:</Text>
              {track.preview_url ? (
                <Flex width="100%">
                  <Slider
                    aria-label="slider-ex-1"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleSetVolume}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <ReactPlayer
                    url={track.preview_url}
                    playing={playing}
                    style={{ display: "none" }}
                    volume={volume}
                    loop
                    config={{
                      file: {
                        forceAudio: true,
                      },
                    }}
                  />
                </Flex>
              ) : (
                <Text>Unavailable</Text>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  } else {
    return null;
  }
};

export default Track;
