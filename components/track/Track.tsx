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
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { msConvertor } from "../../lib/helper/msConvertor";
import ReactPlayer from "react-player/lazy";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Track.module.css";
import SoundIcon from "./SoundIcon";
import { IoVolumeMediumOutline, IoAddCircleOutline } from "react-icons/io5";
import { ImSpotify } from "react-icons/im";
import Link from "next/link";
import usePlaying from "./usePlaying";

interface TrackProps {
  index?: string | number;
  track: any;
  onClickAdd: (trackURI: string) => void;
  volume: number;
  handleSetVolume: (value: number) => void;
}

const Track: React.FC<TrackProps> = ({
  index,
  track,
  onClickAdd,
  volume,
  handleSetVolume,
}) => {
  const { ref, isPlaying, setIsPlaying } = usePlaying(false);
  const bgActive = useColorModeValue("#E9D8FD", "hsla(0, 0%, 100%, 0.1)");

  if (track) {
    const trackLen = msConvertor(track.duration_ms);
    return (
      <motion.div
        layout
        onClick={() => setIsPlaying(true)}
        className={styles.track}
        ref={ref}
        style={isPlaying ? { backgroundColor: bgActive } : {}}
        transition={{ duration: 0.2 }}
      >
        <motion.div layout className={styles.trackGrid}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Heading size="sm">
              {isPlaying && track.preview_url ? <SoundIcon /> : `${index}.`}
            </Heading>
          </Box>
          <Box display="flex" alignItems="center">
            <Flex pr={"8px"} justifyContent="flex-start" flexDir="column">
              <Heading
                size="sm"
                isTruncated
                noOfLines={1}
                justifySelf="start"
                mb={1.8}
              >
                {track.name}
              </Heading>
              <Flex>
                {track.explicit && (
                  <Badge colorScheme="purple" mr={2}>
                    Explicit
                  </Badge>
                )}
                <Flex fontSize="sm">
                  <Text isTruncated>
                    {track.artists.map((a) => a.name).join(", ")}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <div>{trackLen}</div>
          </Box>
        </motion.div>
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              layout
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.3,
                },
              }}
              exit={{
                opacity: 0,
              }}
            >
              {track.preview_url ? (
                <Flex width="100%" py={2} px={"16px"}>
                  <HStack>
                    <Tooltip label="Add to playlist">
                      <IconButton
                        aria-label="Add"
                        onClick={() => onClickAdd(track.uri)}
                      >
                        <Icon as={IoAddCircleOutline} />
                      </IconButton>
                    </Tooltip>

                    <Link href={track.external_urls.spotify} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <IconButton aria-label="Spotify">
                          <Icon as={ImSpotify} color="purple.400" />
                        </IconButton>
                      </a>
                    </Link>
                  </HStack>
                  <Spacer />
                  <Flex
                    alignItems="center"
                    minWidth={["120px", "120px", "200px"]}
                  >
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
                    playing={isPlaying}
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
                <>
                  <Text width="100%" py={2} px={"16px"}>
                    Preview unavailable
                  </Text>
                  <Box width="100%" py={2} px={"16px"}>
                    <HStack>
                      <Tooltip label="Add to playlist">
                        <IconButton
                          aria-label="Add"
                          onClick={() => onClickAdd(track.uri)}
                        >
                          <Icon as={IoAddCircleOutline} />
                        </IconButton>
                      </Tooltip>

                      <Link href={track.external_urls.spotify} passHref>
                        <a target="_blank" rel="noopener noreferrer">
                          <IconButton aria-label="Spotify">
                            <Icon as={ImSpotify} color="purple.400" />
                          </IconButton>
                        </a>
                      </Link>
                    </HStack>
                  </Box>
                </>
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
