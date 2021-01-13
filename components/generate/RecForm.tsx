import {
  Button,
  FormControl,
  FormErrorMessage,
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
  CircularProgress,
  Center,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";

interface RecFormProps {
  submit: boolean;
  setSubmit: (value: boolean) => void;
  setTracks: (values: any[]) => void;
}

const RecForm: React.FC<RecFormProps> = ({ submit, setSubmit, setTracks }) => {
  const [session, loading] = useSession();
  const { register, handleSubmit, errors, formState } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (formData) => {
    // alert(JSON.stringify(formData));
    try {
      // set submit
      setSubmit(true);
      // open modal
      onOpen();
      const topTracks = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + session.accessToken,
          },
          params: {
            limit: 3,
            time_range: "short_term",
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
            time_range: "short_term",
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
            limit: 30,
            seed_tracks: topTracks.data.items.map((item) => item.id).join(","),
            seed_artists: topArtists.data.items
              .map((item) => item.id)
              .join(","),
            target_energy: formData.energy,
            target_danceability: formData.danceability,
            target_instrumentalness: formData.instrumentalness,
          },
        }
      );

      setTracks(recommendations.data.tracks);
      setSubmit(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generating</ModalHeader>
          <ModalBody>
            {submit && (
              <Center>
                <Text>Generating based on your preferences</Text>
                <CircularProgress isIndeterminate color="green.500" />
              </Center>
            )}
          </ModalBody>
          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="energy">Relaxed - Energetic</FormLabel>
          <Slider
            aria-label="slider-ex-2"
            colorScheme="pink"
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
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="danceability">Shy - Friendly</FormLabel>
          <Slider
            aria-label="slider-ex-2"
            colorScheme="pink"
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
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="instrumentalness">Apathetic - Curious</FormLabel>
          <Slider
            aria-label="slider-ex-2"
            colorScheme="pink"
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
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default RecForm;