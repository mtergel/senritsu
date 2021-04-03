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
  Link,
  Text,
} from "@chakra-ui/layout";
import { usePalette } from "react-palette";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Header from "../components/layout/components/Header";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import RecForm from "../components/generate/RecForm";
import { CircularProgress } from "@chakra-ui/progress";
import TrackGrid from "../components/trackGrid/TrackGrid";
import Player from "../components/player/Player";

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
          colSpan={[0, 0, 0, 4]}
          width={["0%", "0%", "0%", "100%"]}
          display={["none", "none", "none", "block"]}
          transition="all 0.3s ease"
          backgroundColor={image.color}
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
        <GridItem colSpan={[12, 12, 12, 8]} zIndex={2} height="100%">
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

  const res = await api.photos.getRandom({
    count: 20,
    featured: true,
    orientation: "portrait",
  });

  return { props: { res }, revalidate: 1800 };
}

export default Home;

interface MainComponentProps {
  image: Random;
}
const MainComponent: React.FC<MainComponentProps> = ({ image }) => {
  const [session, loading] = useSession();
  const { data, loading: colorLoading, error } = usePalette(image.urls.small);

  const bgColor = colorLoading
    ? image.color
    : useColorModeValue(data.lightMuted, data.darkMuted);

  const textColor = useColorModeValue("#181a18", "white");

  const bgPaper = useColorModeValue("whiteAlpha.800", "blackAlpha.700");

  const [tracks, setTracks] = useState<null | any[]>(null);

  const handleSetTracks = useCallback((values: any[]) => {
    setTracks(values);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsPlaying(false);
    setTracks(null);
    setPlayingTrackIndex(null);
  }, []);

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
          <CircularProgress isIndeterminate />
        </Center>
      ) : (
        <Box display="flex" flexDirection="column" flexGrow={1} py={[1, 1, 6]}>
          <Container
            maxWidth="100%"
            paddingLeft={["1rem", "1rem", "4rem"]}
            paddingRight={["1rem", "1rem", "4rem"]}
            flexGrow={1}
          >
            {!session && (
              <Center>
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
                >
                  <Heading mr={4} size="md">
                    Login with
                  </Heading>
                  <Image src={"/Spotify-Logo.png"} width="48px" />
                </Button>
              </Center>
            )}
            {session && (
              <Box height="100%" display="flex" flexDir="column">
                {!tracks && (
                  <Box>
                    <Heading mb={2}>Discover New Music</Heading>
                    <Text>
                      This app uses{" "}
                      <Link as={"b"} href="https://developer.spotify.com/">
                        Spotify's API{" "}
                      </Link>
                      to discover new music based on your preferences.
                    </Text>
                  </Box>
                )}

                <Box flexGrow={1} my={8}>
                  {tracks ? (
                    <TrackGrid
                      tracks={tracks}
                      playingIndex={playingTrackIndex}
                      onClick={handleTrackIndex}
                      refresh={handleRefresh}
                    />
                  ) : (
                    <RecForm setTracks={handleSetTracks} />
                  )}
                </Box>
                <Player
                  bgPaper={bgPaper}
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
