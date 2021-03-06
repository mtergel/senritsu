import { signIn, useSession } from "next-auth/client";
import Layout from "../components/layout/Layout";
import { createApi } from "unsplash-js";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import ImageGallery from "../components/imageGallery/ImageGallery";
import { Random } from "unsplash-js/dist/methods/photos/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { wrap } from "popmotion";
import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  VStack,
} from "@chakra-ui/layout";
import { usePalette } from "react-palette";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Header from "../components/layout/components/Header";
import { Button, IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import RecForm from "../components/generate/RecForm";
import TrackGrid from "../components/trackGrid/TrackGrid";
import Player from "../components/player/Player";
import GeneratePlaylist from "../components/generate/GeneratePlaylist";
import { useDisclosure } from "@chakra-ui/hooks";
import Loader from "react-loader-spinner";
import { HiSearch } from "react-icons/hi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
const hostname =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXTAUTH_URL;

interface HomeProps {
  res: ApiResponse<Random>;
}

const Home = (props: HomeProps) => {
  const images = (props.res.response as unknown) as Random[];

  const [session] = useSession();
  useEffect(() => {
    // @ts-ignore
    if (session?.error === "RefreshAccessTokenError") {
      signIn("spotify", { callbackUrl: hostname }); // Force sign in to hopefully resolve error
    }
  }, [session]);

  // Image gallery states
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const image = images[imageIndex];

  return (
    <Layout>
      <Grid templateColumns="repeat(12, 1fr)" height="100%">
        <GridItem
          colSpan={[0, 0, 0, 3]}
          width={["0%", "0%", "0%", "100%"]}
          display={["none", "none", "none", "block"]}
          transition="all 0.3s ease"
          backgroundColor={image ? image.color : "transparent"}
        >
          {props.res.response && (
            <ImageGallery
              image={image}
              direction={direction}
              page={page}
              paginate={paginate}
            />
          )}
        </GridItem>
        <GridItem colSpan={[12, 12, 12, 9]} zIndex={2} height="100%">
          <MainComponent image={image} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export async function getStaticProps() {
  const api = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
  });

  let res = {
    response: [],
  };
  try {
    // @ts-ignore
    res = await api.photos.getRandom({
      count: 20,
      featured: true,
      orientation: "portrait",
    });
  } catch (error) {}

  return { props: { res }, revalidate: 1800 };
}

export default Home;

interface MainComponentProps {
  image?: Random;
}
const MainComponent: React.FC<MainComponentProps> = ({ image }) => {
  const [session, loading] = useSession();
  const { data, loading: colorLoading } = usePalette(
    image ? image.urls.small : ""
  );

  const bgColor = colorLoading
    ? image && image.color
    : useColorModeValue(data.lightMuted, data.darkMuted);

  const textColor = useColorModeValue("#181a18", "white");

  const bgPaper = useColorModeValue("whiteAlpha.800", "blackAlpha.700");

  const [tracks, setTracks] = useState<null | any[]>(null);

  const handleSetTracks = (values: any[]) => {
    setPlayingTrackIndex(null);
    handleIsPlaying(false);

    setTracks(null);

    setTracks(values);
  };

  const [playingTrackIndex, setPlayingTrackIndex] = useState<number | null>(
    null
  );

  const handleTrackIndex = useCallback((index: number | null) => {
    if (index === null) {
      setPlayingTrackIndex(null);
      setIsPlaying(false);
    } else {
      setPlayingTrackIndex(index);
      setIsPlaying(true);
    }
  }, []);

  const [volume, setVolume] = useState(0.2);
  const handleSetVolume = useCallback((value: number) => {
    setVolume(value);
  }, []);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleIsPlaying = useCallback((value: boolean) => {
    setIsPlaying(value);
  }, []);

  const handlePlay = useCallback(() => {
    if (playingTrackIndex !== null && playingTrackIndex >= 0) {
      setIsPlaying(true);
    } else if (tracks) {
      setPlayingTrackIndex(0);
      setIsPlaying(true);
    }
  }, [playingTrackIndex, tracks]);

  const onEnded = useCallback(() => {
    if (playingTrackIndex + 1 < tracks.length) {
      setPlayingTrackIndex((prevState) => {
        return prevState + 1;
      });
    } else {
      setPlayingTrackIndex(null);
      setIsPlaying(false);
    }
  }, [playingTrackIndex, tracks]);

  const currentTrack = useMemo(() => {
    return playingTrackIndex !== null && playingTrackIndex >= 0
      ? tracks[playingTrackIndex]
      : null;
  }, [playingTrackIndex, tracks]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: mobileOpen,
    onClose: mobileOnclose,
    onOpen: mobileOnOpen,
  } = useDisclosure();

  return (
    <Box
      w="100%"
      h="100%"
      transition="all .6s ease"
      backgroundColor={bgColor}
      color={textColor}
      display="flex"
      flexDirection="column"
    >
      <Header />
      {loading ? (
        <Center py={6}>
          <Loader type="Bars" height={80} width={80} color={textColor} />
        </Center>
      ) : (
        <Box display="flex" flexDirection="column" flexGrow={1} pb={[1, 1, 6]}>
          <Container
            maxWidth="100%"
            paddingLeft={["1rem", "1rem", "4rem"]}
            paddingRight={["1rem", "1rem", "4rem"]}
            flexGrow={1}
          >
            {!session && (
              <Center display="flex" flexDir="column" height="50%">
                <VStack>
                  <Heading size="lg">
                    Your interface for music discovery, powered by Spotify.
                  </Heading>

                  <Heading size="sm">Made by Tergel Munkhdelger.</Heading>
                </VStack>

                <Button
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  boxShadow="lg"
                  px={8}
                  py={2}
                  cursor="pointer"
                  backgroundColor={bgPaper}
                  height="auto"
                  onClick={() => signIn("spotify", { callbackUrl: hostname })}
                  mt={6}
                >
                  <Heading mr={4} size="md">
                    Login with
                  </Heading>
                  <Image
                    src={"/Spotify-Logo.png"}
                    width="48px"
                    height="48px"
                    alt="spotify"
                  />
                </Button>
              </Center>
            )}
            {session && (
              <Box height="100%" display="flex" flexDir="column">
                <Box flexGrow={1} position="relative">
                  <Grid
                    templateColumns="repeat(12, 1fr)"
                    height="100%"
                    columnGap="25"
                  >
                    <GridItem colSpan={[12, 12, 12, 9]}>
                      {tracks ? (
                        <>
                          <TrackGrid
                            tracks={tracks}
                            playingIndex={playingTrackIndex}
                            onClick={handleTrackIndex}
                          />

                          <GeneratePlaylist
                            open={isOpen}
                            onClose={onClose}
                            tracks={tracks}
                          />
                        </>
                      ) : (
                        <Heading size="md">Try searching !</Heading>
                      )}
                    </GridItem>
                    <GridItem
                      colSpan={[0, 0, 0, 3]}
                      display={["none", "none", "none", "block"]}
                      zIndex={2}
                      height="100%"
                    >
                      <RecForm setTracks={handleSetTracks} />
                    </GridItem>
                  </Grid>
                  <IconButton
                    display={[
                      "inline-flex",
                      "inline-flex",
                      "inline-flex",
                      "none",
                    ]}
                    position="absolute"
                    isRound
                    variant="solid"
                    colorScheme="green"
                    aria-label="search options"
                    icon={<HiSearch />}
                    right={["24px", "24px", "48px"]}
                    bottom={["24px", "24px", "24px"]}
                    onClick={mobileOnOpen}
                  />
                  <Modal isOpen={mobileOpen} onClose={mobileOnclose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalCloseButton />
                      <ModalBody bg="transparent">
                        <RecForm
                          setTracks={handleSetTracks}
                          inModal={true}
                          modalOnClose={mobileOnclose}
                        />
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Box>
                <Player
                  disabled={!Boolean(tracks)}
                  handleIsPlaying={handleIsPlaying}
                  handlePlay={handlePlay}
                  handleSetVolume={handleSetVolume}
                  isPlaying={isPlaying}
                  onEnded={onEnded}
                  playingTrackIndex={playingTrackIndex}
                  track={currentTrack}
                  volume={volume}
                />
              </Box>
            )}
          </Container>
        </Box>
      )}
    </Box>
  );
};
