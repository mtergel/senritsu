import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/layout";
import Scrollbar from "react-scrollbars-custom";
import { MdRefresh } from "react-icons/md";
import { FiPlay, FiPause } from "react-icons/fi";
import { DarkMode } from "@chakra-ui/color-mode";
import styles from "./TrackGrid.module.scss";
import { memo } from "react";
interface TrackGridProps {
  tracks: any[];
  onClick: (index: number | null) => void;
  playingIndex: number | null;
  refresh: () => void;
}
const TrackGrid: React.FC<TrackGridProps> = memo(
  ({ tracks, onClick, playingIndex, refresh }) => {
    return (
      <Scrollbar
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Box width="100%" height="100%">
          <Grid
            templateColumns={[
              "repeat(auto-fill, minmax(280px, 1fr))",
              "repeat(auto-fill, minmax(280px, 1fr))",
              "repeat(auto-fill, minmax(180px, 1fr))",
            ]}
            justifyItems={["center", "center", "flex-start"]}
            gap="18px"
            role="grid"
          >
            {tracks.map((i, index) => (
              <GridItem
                tabIndex={0}
                role="gridcell"
                position="relative"
                width={["280px", "280px", "180px"]}
                height={["280px", "280px", "180px"]}
                className={styles.imageContainer}
                outline="none"
                _focus={{
                  boxShadow: "0 0 0 3px rgba(255, 255, 255, 1)",
                }}
                onClick={() => onClick(index)}
              >
                <Image
                  src={i.album.images[1].url}
                  width={["280px", "280px", "180px"]}
                  height={["280px", "280px", "180px"]}
                  alt={i.name}
                  objectFit="cover"
                />
                <Box
                  bg="rgba(0, 0, 0, 0.5)"
                  pos="absolute"
                  left={0}
                  right={0}
                  bottom={0}
                  height="100%"
                  width="100%"
                  color="white"
                  opacity={playingIndex === index ? 1 : 0}
                  visibility={playingIndex === index ? "visible" : "hidden"}
                  transition={"all .3s ease"}
                  className={styles.imageHover}
                >
                  <DarkMode>
                    <Center height="100%" width="100%" px={2}>
                      <VStack spacing={2}>
                        {playingIndex === index ? (
                          <IconButton
                            aria-label="stop preview"
                            icon={<FiPause fontSize="24px" />}
                            bg="rgba(0, 0, 0, 0.16)"
                            _focus={{
                              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.6)",
                            }}
                            color="white"
                            onClick={(event) => {
                              event.stopPropagation();
                              onClick(null);
                            }}
                            variant="outline"
                          />
                        ) : (
                          <IconButton
                            aria-label="play preview"
                            icon={<FiPlay fontSize="24px" />}
                            bg="rgba(0, 0, 0, 0.16)"
                            _focus={{
                              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.6)",
                            }}
                            color="white"
                            onClick={() => onClick(index)}
                            variant="outline"
                          />
                        )}

                        <Heading
                          as={"a"}
                          href={i.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="sm"
                          textAlign="center"
                          noOfLines={2}
                          wordBreak="break-word"
                        >
                          {i.name}
                        </Heading>
                        <Flex wrap="wrap" justifyContent="center">
                          {i.artists.map((a) => (
                            <Text
                              as={"a"}
                              href={a.external_urls.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              textAlign="center"
                              fontSize="xs"
                              wordBreak="break-word"
                              display="inline-block"
                              paddingInlineStart={0}
                              _notFirst={{
                                _before: {
                                  content: '", "',
                                },
                              }}
                            >
                              {a.name}
                            </Text>
                          ))}
                        </Flex>
                      </VStack>
                    </Center>
                  </DarkMode>
                </Box>
              </GridItem>
            ))}
          </Grid>
          <Center display="flex" alignItems="center" mt={"18px"}>
            <Heading size="md" textAlign="center" mr={2}>
              Done listenting?
            </Heading>
            <IconButton
              onClick={refresh}
              aria-label="Refresh"
              icon={<MdRefresh fontSize="24px" />}
            />
          </Center>
        </Box>
      </Scrollbar>
    );
  }
);

export default TrackGrid;
