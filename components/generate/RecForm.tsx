import {
  Button,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Center,
  Text,
  useColorModeValue,
  Box,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { memo, useState } from "react";

interface RecFormProps {
  submit: boolean;
  setSubmit: (value: boolean) => void;
  setTracks: (values: any[]) => void;
}

const RecForm: React.FC<RecFormProps> = memo(
  ({ submit, setSubmit, setTracks }) => {
    const [session, loading] = useSession();
    const { register, handleSubmit, formState } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const sliderColor = useColorModeValue("whiteAlpha", "blackAlpha");
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = async (formData) => {
      // alert(JSON.stringify(formData));
      try {
        // set submit
        setSubmit(true);

        const topTracks = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + session.accessToken,
            },
            params: {
              limit: 3,
              time_range: "long_term",
            },
          }
        );

        const topArtists = await axios.get(
          "https://api.spotify.com/v1/me/top/artists",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + session.accessToken,
            },
            params: {
              limit: 2,
              time_range: "long_term",
            },
          }
        );
        const recommendations = await axios.get(
          "https://api.spotify.com/v1/recommendations",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + session.accessToken,
            },
            params: {
              limit: 100,
              seed_tracks: topTracks.data.items
                .map((item) => item.id)
                .join(","),
              seed_artists: topArtists.data.items
                .map((item) => item.id)
                .join(","),
              target_energy: formData.energy,
              target_danceability: formData.danceability,
              target_instrumentalness: formData.instrumentalness,
            },
          }
        );

        setTracks(recommendations.data.tracks.filter((i) => i.preview_url));
        setSubmit(false);
      } catch (error) {
        onOpen();
        console.log(error);
        setError(
          "Sorry, you don't have any listened tracks. Please come back after you listened to some of your favourite tracks"
        );
      }
    };

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Generating</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {error && (
                <Center>
                  <Text>{error}</Text>
                </Center>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box maxW="400px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="energy">Relaxed - Energetic</FormLabel>
              <Slider
                aria-label="slider-ex-2"
                colorScheme={sliderColor}
                defaultValue={0.5}
                name="energy"
                aria-labelledby="energy"
                min={0}
                max={1}
                step={0.1}
                ref={register}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="danceability">Shy - Friendly</FormLabel>
              <Slider
                aria-label="slider-ex-2"
                colorScheme={sliderColor}
                defaultValue={0.5}
                name="danceability"
                aria-labelledby="danceability"
                min={0}
                max={1}
                step={0.1}
                ref={register}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="instrumentalness">
                Curious - Apathetic
              </FormLabel>
              <Slider
                aria-label="slider-ex-2"
                colorScheme={sliderColor}
                defaultValue={0.5}
                name="instrumentalness"
                aria-labelledby="instrumentalness"
                min={0}
                max={1}
                step={0.1}
                ref={register}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <Button mt={4} isLoading={formState.isSubmitting} type="submit">
              Generate
            </Button>
          </form>
        </Box>
      </>
    );
  }
);

export default RecForm;
