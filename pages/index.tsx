import {
  Box,
  CircularProgress,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
  Text,
  Heading,
  Center,
  Flex,
  Button,
  Link,
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import { useState } from "react";
import RecForm from "../components/generate/RecForm";
import Layout from "../components/layout/Layout";
import TrackList from "../components/track/TrackList";
import axios from "axios";
import Article from "../components/article/Article";
import PlaylistItem from "../components/playlist/PlaylistItem";
import { motion } from "framer-motion";

const Generate = ({ session, content }) => {
  const [submit, setSubmit] = useState(false);
  const [tracks, setTracks] = useState<null | any[]>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("#ffffff", "rgb(26,26,26)");
  const toast = useToast();

  const handleOpen = (trackURI: string) => {
    setSelectedTrack(trackURI);
    onOpen();
  };

  const handleSubmit = (value: boolean) => {
    setSubmit(value);
  };
  const handleSetTracks = (values: any[]) => {
    setTracks(values);
  };

  const onAddTrackToPlaylist = async (pid: string) => {
    try {
      setLoading(true);
      await axios.post(
        `https://api.spotify.com/v1/playlists/${pid}/tracks`,
        null,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session.accessToken,
          },
          params: {
            uris: selectedTrack,
          },
        }
      );
      setLoading(false);
      onClose();
      toast({
        title: "Track added.",
        description: "We've added that track to your playlist.",
        status: "success",
        duration: 4500,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      onClose();
      toast({
        title: "An error occurred.",
        description: "Unable to add track to playlist.",
        status: "error",
        duration: 4500,
        isClosable: true,
      });
    }
  };

  const filterdPlaylist = content.items.filter(
    (i) => i.owner.id === session.id
  );
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setTracks(null);
  };

  return (
    <>
      <Layout>
        <Box
          display="flex"
          flexDirection={["column", "column", "column", "column", "row"]}
          justifyContent="space-around"
          alignItems="stretch"
          boxSizing="border-box"
        >
          {tracks ? (
            <>
              <Flex flexDirection="column" pb={8}>
                <TrackList
                  trackList={tracks}
                  onClickAdd={handleOpen}
                  handleReset={handleReset}
                />
              </Flex>
            </>
          ) : (
            <Box flexGrow={1} width="100%" px={6} maxW={"600px"}>
              <RecForm
                submit={submit}
                setSubmit={handleSubmit}
                setTracks={handleSetTracks}
              />
            </Box>
          )}
          <Box position="relative" width="400px" ml={[8, 8, 16]} mt={"40px"}>
            <Box position="fixed" width="400px" px={2} zIndex={-1}>
              <Box mb={8} display="flex" justifyContent="center">
                <img src="/static/layout/svg.svg" width="280px" height="auto" />
              </Box>
              <Center mb={4}>
                <Heading size="lg" textAlign="center">
                  Welcome to Senritsu
                </Heading>
              </Center>
              <Center>
                <Text align="center">
                  This app uses{" "}
                  <Link color="#1DB954" href="https://developer.spotify.com/">
                    Spotify's APIs{" "}
                  </Link>
                  to discover new music based on your preferences.
                </Text>
              </Center>
            </Box>
          </Box>
        </Box>
      </Layout>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent backgroundColor={bg}>
          <ModalHeader>Add track to</ModalHeader>
          <ModalCloseButton />
          <ModalBody position="relative">
            <Article>
              <Grid
                as="section"
                templateColumns="repeat(auto-fill,minmax(180px,1fr))"
                width="100%"
                gridColumnGap={"24px"}
                gridRowGap={"12px"}
              >
                {filterdPlaylist &&
                  filterdPlaylist.map((playlist) => (
                    <PlaylistItem
                      name={playlist.name}
                      description={playlist.description}
                      owner_name={playlist.owner.display_name}
                      id={playlist.id}
                      image={playlist.images[0].url}
                      onClick={() => onAddTrackToPlaylist(playlist.id)}
                      key={playlist.id}
                    />
                  ))}
              </Grid>
            </Article>
            {loading && (
              <Box
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="rgba(26,26,26, 0.5)"
              >
                <CircularProgress isIndeterminate color="purple.400" />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  let content = null;
  if (session && session.accessToken) {
    try {
      const call = await axios.get(
        `https://api.spotify.com/v1/users/${session.id}/playlists`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + session.accessToken,
          },
        }
      );
      const data = call.data;
      if (data) {
        content = data;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader("Location", `/auth/signin`);
        ctx.res.end();
        return {
          props: {},
        };
      } else {
        return {
          props: {
            session,
            content,
            cookies: ctx.req.headers.cookie ?? "",
            error: "Something happend",
          },
        };
      }
    }
  } else {
    ctx.res.statusCode = 302;
    ctx.res.setHeader("Location", `/auth/signin`);
    ctx.res.end();
    return {
      props: {},
    };
  }

  return {
    props: {
      session,
      content,
      cookies: ctx.req.headers.cookie ?? "",
    },
  };
}

export default Generate;
