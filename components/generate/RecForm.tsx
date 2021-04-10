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
  ScaleFade,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import { memo, useCallback, useState } from "react";
import { Switch } from "@chakra-ui/react";
import debounce from "lodash/debounce";

interface RecFormProps {
  setTracks: (values: any[]) => void;
  bgPaper: string;
}

const RecForm: React.FC<RecFormProps> = memo(({ setTracks, bgPaper }) => {
  const [session, _] = useSession();
  const { register, handleSubmit, formState, watch } = useForm({
    shouldUnregister: false,
    defaultValues: {
      userPref: true,
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sliderColor = useColorModeValue("blackAlpha", "whiteAlpha");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // SEARCH
  const [items, setItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  const searchMore = watch("userPref");
  const searchByTracks = watch("searchByTracks");

  const onSubmit = async (formData) => {
    try {
      console.log(formData);

      setLoading(true);
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

      setTracks(recommendations.data.tracks.filter((i) => i.preview_url));
      setLoading(false);
    } catch (error) {
      onOpen();
      console.log(error);
      setLoading(false);
      setError(
        "Sorry, you don't have any listened tracks. Please come back after you listened to some of your favourite tracks"
      );
    }
  };

  const handleSearch = async (inputText: string) => {
    try {
      const searchRes = await axios.get("https://api.spotify.com/v1/search", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
        params: {
          q: inputText,
          type: searchByTracks ? "track" : "artist",
        },
      });
      console.log("SEARCH POG: ", inputText);

      console.log("SEARCH POG: ", searchRes.data);
    } catch (error) {}
  };

  const debouncedUpdate = useCallback(
    debounce((inputText) => handleSearch(inputText), 1000),
    []
  );

  const handleTextUpdate = (event) => {
    setSearchText(event.target.value);
    debouncedUpdate(event.target.value);
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
      <Box
        borderRadius="md"
        p={4}
        backgroundColor={bgPaper}
        boxShadow="lg"
        alignItems="center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="userPref" mb="0">
              Use my preferences:
            </FormLabel>
            <Switch
              id="userPref"
              colorScheme={"green"}
              name="userPref"
              ref={register}
            />
          </FormControl>

          {/* <ScaleFade initialScale={0.9} in={!searchMore} unmountOnExit> */}
          <ScaleFade in={true}>
            <Box my={4}>
              <VStack>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="search-type" mb="0">
                    Search by artists/tracks:
                  </FormLabel>
                  <Switch
                    id="search-type"
                    colorScheme={sliderColor}
                    name="searchByTracks"
                    ref={register}
                  />
                </FormControl>
                <Input
                  placeholder="Search artists"
                  value={searchText}
                  onChange={handleTextUpdate}
                />
              </VStack>
            </Box>
          </ScaleFade>

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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <Button
            mt={4}
            type="submit"
            isFullWidth
            colorScheme="green"
            disabled={loading}
          >
            Generate
          </Button>
        </form>
      </Box>
    </>
  );
});

export default RecForm;
