import { FiPlay, FiPause } from "react-icons/fi";
import { IoVolumeMediumOutline } from "react-icons/io5";
import { SiSpotify } from "react-icons/si";
import { CgPlayListAdd } from "react-icons/cg";
import ReactPlayer from "react-player/lazy";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider";
import Icon from "@chakra-ui/icon";
import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { Box, Center, Flex, Grid, Heading, HStack } from "@chakra-ui/layout";
import { signout, useSession } from "next-auth/client";
import { Tooltip } from "@chakra-ui/tooltip";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { MdRefresh } from "react-icons/md";
import SoundIcon from "../soundBar/SoundIcon";
import PlaylistItem from "../playlist/PlayListItem";

interface PlayerProps {
  volume: number;
  bgPaper: string;
  isPlaying: boolean;
  handleIsPlaying: (value: boolean) => void;
  track: any;
  disabled: boolean;
  handlePlay: () => void;
  playingTrackIndex: number | null;
  onEnded: () => void;
  handleSetVolume: (value: number) => void;
}
const Player: React.FC<PlayerProps> = ({
  volume,
  bgPaper,
  isPlaying,
  handleIsPlaying,
  track,
  disabled,
  handlePlay,
  playingTrackIndex,
  onEnded,
  handleSetVolume,
}) => {
  const [session, loading] = useSession();

  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [playlists, setPlaylists] = useState<any | null>(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchPlaylist = async () => {
    try {
      setFetching(true);
      console.log("sending request");
      const call = await axios.get(
        // @ts-ignore
        `https://api.spotify.com/v1/users/${session.id}/playlists`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + session.accessToken,
          },
        }
      );

      const data = call.data;
      setPlaylists(data);
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  };

  const onAddTrackToPlaylist = async (pid: string) => {
    try {
      setFetching(true);
      await axios.post(
        `https://api.spotify.com/v1/playlists/${pid}/tracks`,
        null,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session.accessToken,
          },
          params: {
            uris: track.uri,
          },
        }
      );
      setFetching(false);
      onClose();
      toast({
        title: "Track added.",
        description: "We've added that track to your playlist.",
        status: "success",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      setFetching(false);
      onClose();
      toast({
        title: "An error occurred.",
        description: "Unable to add track to playlist.",
        status: "error",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    }
  };

  const filteredPlaylist = playlists
    ? // @ts-ignore
      playlists.items.filter((i) => i.owner.id === session.id)
    : null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {fetching ? (
              <Center py={4}>
                <CircularProgress isIndeterminate />
              </Center>
            ) : error ? (
              error
            ) : (
              <Box>
                {playlists ? (
                  <Grid
                    as="section"
                    templateColumns="repeat(auto-fill,minmax(180px,1fr))"
                    width="100%"
                    gridColumnGap={"24px"}
                    gridRowGap={"12px"}
                  >
                    {filteredPlaylist &&
                      filteredPlaylist.map((playlist) => (
                        <PlaylistItem
                          name={playlist.name}
                          description={playlist.description}
                          owner_name={playlist.owner.display_name}
                          id={playlist.id}
                          image={
                            playlist.images &&
                            playlist.images.length > 0 &&
                            playlist.images[0].url
                          }
                          onClick={() => onAddTrackToPlaylist(playlist.id)}
                          key={playlist.id}
                        />
                      ))}
                  </Grid>
                ) : (
                  "Try Refreshing"
                )}
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <IconButton
              onClick={fetchPlaylist}
              aria-label="Refresh"
              icon={<MdRefresh fontSize="24px" />}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex alignItems="center" width="100%" height="64px">
        <Box
          flexGrow={1}
          display="flex"
          borderRadius="md"
          px={4}
          backgroundColor={bgPaper}
          boxShadow="lg"
          height="100%"
          alignItems="center"
        >
          {isPlaying ? (
            <IconButton
              aria-label="stop preview"
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
              icon={hovered ? <FiPause /> : <SoundIcon />}
              variant="ghost"
              _focus={{
                boxShadow: "0 0 0 2px rgba(255, 255, 255, 1)",
              }}
              onClick={() => handleIsPlaying(false)}
              disabled={disabled}
            />
          ) : (
            <IconButton
              aria-label="play preview"
              icon={<FiPlay />}
              variant="ghost"
              _focus={{
                boxShadow: "0 0 0 2px rgba(255, 255, 255, 1)",
              }}
              disabled={disabled}
              onClick={handlePlay}
            />
          )}

          <Box
            mx={3}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="40px"
            width="100%"
            flexGrow={1}
          >
            {playingTrackIndex !== null && playingTrackIndex >= 0 ? (
              <>
                <Heading size="xs" noOfLines={1}>
                  {track.name}
                </Heading>
                <ReactPlayer
                  url={track.preview_url}
                  playing={isPlaying}
                  style={{ display: "none" }}
                  volume={volume}
                  onEnded={onEnded}
                  config={{
                    file: {
                      forceAudio: true,
                    },
                  }}
                />
              </>
            ) : (
              <Heading size="xs" noOfLines={1}>
                Select a track
              </Heading>
            )}
            <Box display="flex">
              <Icon as={IoVolumeMediumOutline} mr={4} />
              <Slider
                aria-label="volume slider"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={handleSetVolume}
                colorScheme={"blackAlpha"}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </Box>
          <HStack spacing={3}>
            <Tooltip label="Add to playlist">
              <IconButton
                aria-label="Add to playlist"
                icon={<CgPlayListAdd fontSize="24px" />}
                disabled={disabled || playingTrackIndex === null}
                _focus={{
                  boxShadow: "0 0 0 2px rgba(255, 255, 255, 1)",
                }}
                onClick={onOpen}
                variant="ghost"
              />
            </Tooltip>

            <Tooltip label="View on Spotify">
              <IconButton
                aria-label="Add to playlist"
                icon={<SiSpotify fontSize="24px" />}
                disabled={disabled || playingTrackIndex === null}
                _focus={{
                  boxShadow: "0 0 0 2px rgba(255, 255, 255, 1)",
                }}
                variant="ghost"
                as={"a"}
                href={track ? track.external_urls.spotify : "#"}
                target="_blank"
                rel="noopener noreferrer"
              />
            </Tooltip>
          </HStack>
        </Box>
        <Button
          display={["none", "none", "flex"]}
          ml={8}
          justifyContent="center"
          alignItems="center"
          boxShadow="lg"
          px={4}
          py={2}
          cursor="pointer"
          backgroundColor={bgPaper}
          height="auto"
          onClick={() => signout()}
        >
          <Heading mr={4} size="sm">
            Logout
          </Heading>
          {<Avatar src={session.user.image} />}
        </Button>
      </Flex>
    </>
  );
};

export default Player;
