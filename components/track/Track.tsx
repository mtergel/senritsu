import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { msConvertor } from "../../lib/helper/msConvertor";
import ReactPlayer from "react-player/lazy";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Track.module.css";
import SoundIcon from "./SoundIcon";
import {
  IoHeartOutline,
  IoVolumeMediumOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
import { ImSpotify } from "react-icons/im";
import Link from "next/link";
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
    console.log(track);
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
            <Heading size="sm">
              {playing && track.preview_url ? <SoundIcon /> : `${index}.`}
            </Heading>
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
              {track.preview_url ? (
                <Flex width="100%" py={2} px={"16px"}>
                  <HStack>
                    <IconButton aria-label="Like">
                      <Icon as={IoHeartOutline} />
                    </IconButton>
                    <IconButton aria-label="Add">
                      <Icon as={IoAddCircleOutline} />
                    </IconButton>
                    <Link href={track.external_urls.spotify} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <IconButton aria-label="Spotify">
                          <Icon as={ImSpotify} color="purple.400" />
                        </IconButton>
                      </a>
                    </Link>
                  </HStack>
                  <Spacer />
                  <Flex alignItems="center" minWidth="200px">
                    <Icon as={IoVolumeMediumOutline} mr={2} />
                    <Slider
                      aria-label="slider-ex-1"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleSetVolume}
                      colorScheme="purple"
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Flex>

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
                <Text width="100%" py={2} px={"16px"}>
                  Preview unavailable
                </Text>
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
