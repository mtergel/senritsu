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
  VStack,
  Input,
  List,
  ListItem,
  Flex,
  Wrap,
  IconButton,
  Avatar,
  CircularProgress,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import { memo, useCallback, useEffect, useState } from "react";
import { Switch } from "@chakra-ui/react";
import debounce from "lodash/debounce";
import { HiXCircle } from "react-icons/hi";
import { useCombobox } from "downshift";

interface RecFormProps {
  setTracks: (values: any[]) => void;
  inModal?: boolean;
  modalOnClose?: () => void;
}

const RecForm: React.FC<RecFormProps> = memo(
  ({ setTracks, inModal, modalOnClose }) => {
    const [session, _] = useSession();
    const { register, handleSubmit, watch } = useForm({
      shouldUnregister: false,
      defaultValues: {
        userPref: true,
      },
    });

    const bgPaper = useColorModeValue("whiteAlpha.800", "blackAlpha.700");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const sliderColor = useColorModeValue("blackAlpha", "whiteAlpha");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // SEARCH
    const [items, setItems] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [searchByTracks, setSearchByTracks] = useState(false);
    const [searching, setSearching] = useState(false);

    const searchMore = watch("userPref");
    useEffect(() => {
      setSearchText("");
      setItems([]);
      setSelectedItems([]);
    }, [searchByTracks]);

    const onSubmit = async (formData) => {
      try {
        console.log(formData);

        setLoading(true);

        if (searchMore) {
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
        } else {
          let params = {
            limit: 100,
            target_energy: formData.energy,
            target_danceability: formData.danceability,
            target_instrumentalness: formData.instrumentalness,
          };
          if (searchByTracks) {
            params["seed_tracks"] = selectedItems.map((i) => i.id).join(",");
          } else {
            params["seed_artists"] = selectedItems.map((i) => i.id).join(",");
          }

          const recommendations = await axios.get(
            "https://api.spotify.com/v1/recommendations",
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + session.accessToken,
              },
              params,
            }
          );
          setTracks(recommendations.data.tracks.filter((i) => i.preview_url));
        }

        setLoading(false);
        modalOnClose && modalOnClose();
      } catch (error) {
        onOpen();
        console.log(error);
        setLoading(false);
        setError(
          "Sorry, you don't have any listened tracks. Please come back after you listened to some of your favourite tracks"
        );
      }
    };

    const handleSearch = async (inputText: string, type: string) => {
      if (inputText) {
        try {
          const searchRes = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + session.accessToken,
              },
              params: {
                q: inputText,
                type: type,
                limit: 10,
              },
            }
          );

          if (type === "track") {
            setItems(searchRes.data.tracks.items);
          } else {
            setItems(searchRes.data.artists.items);
          }
          setSearching(false);
        } catch (error) {
          setSearching(false);
        }
      } else {
        setSearching(false);
      }
    };

    const debouncedUpdate = useCallback(
      debounce(
        (inputText) =>
          handleSearch(inputText, searchByTracks ? "track" : "artist"),
        700
      ),
      [searchByTracks]
    );

    const handleTextChange = (textValue: string) => {
      setSearchText(textValue);
      debouncedUpdate(textValue);
      setSearching(true);
    };

    const handleAddToSelect = (item: any) => {
      if (
        selectedItems.length < 5 &&
        !selectedItems.some((a) => a.id === item.id)
      ) {
        setSelectedItems((prevState) => {
          let newArr = [...prevState].concat([item]);
          return newArr;
        });
      }
    };

    const removeItem = (id: string) => {
      let itemToRemoveIndex = selectedItems.findIndex((i) => i.id === id);
      if (itemToRemoveIndex >= 0) {
        setSelectedItems((prevState) => {
          let newArr = [...prevState];
          newArr.splice(itemToRemoveIndex, 1);
          return newArr;
        });
      }
    };

    const chipColor = useColorModeValue("gray.200", "gray.600");

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
          backgroundColor={inModal ? "transparent" : bgPaper}
          boxShadow={inModal ? "none" : "xl"}
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

            <ScaleFade initialScale={0.9} in={!searchMore} unmountOnExit>
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
                      onChange={() => setSearchByTracks(!searchByTracks)}
                    />
                  </FormControl>
                  <ComboBox
                    inputValue={searchText}
                    options={items}
                    setInputValue={handleTextChange}
                    loading={searching}
                    renderItem={(item) => {
                      let image: string | null = searchByTracks
                        ? item.album && item.album.images.length > 2
                          ? item.album.images[1].url
                          : null
                        : item.images && item.images.length > 2
                        ? item.images[1].url
                        : null;
                      return (
                        <Flex
                          width="100%"
                          justifyContent="flex-start"
                          onClick={() => handleAddToSelect(item)}
                        >
                          <Avatar
                            src={image}
                            alt={item.name}
                            mr="12px"
                            size="sm"
                          />
                          <Text>{item.name}</Text>
                        </Flex>
                      );
                    }}
                  />
                  <Wrap justify="center">
                    {selectedItems.map((i, index) => {
                      let image: string | null = searchByTracks
                        ? i.album && i.album.images.length > 2
                          ? i.album.images[1].url
                          : null
                        : i.images && i.images.length > 2
                        ? i.images[1].url
                        : null;

                      return (
                        <Flex
                          justifyContent="flex-start"
                          borderRadius="full"
                          backgroundColor={chipColor}
                          alignItems="center"
                          py={1}
                          px={2}
                          key={i.id}
                        >
                          <Avatar
                            src={image}
                            alt={i.name}
                            mr={"8px"}
                            size="sm"
                          />
                          <Text fontSize="sm" mr="8px" noOfLines={1}>
                            {i.name}
                          </Text>
                          <IconButton
                            isRound
                            size="xs"
                            aria-label="remove artist"
                            icon={<HiXCircle fontSize="16px" />}
                            onClick={() => removeItem(i.id)}
                          />
                        </Flex>
                      );
                    })}
                  </Wrap>
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
              disabled={loading || (!searchMore && selectedItems.length === 0)}
            >
              Generate
            </Button>
          </form>
        </Box>
      </>
    );
  }
);

interface ComboBoxProps {
  inputValue: string;
  setInputValue: (textValue: string) => void;
  options: any[];
  renderItem: (item) => JSX.Element;
  loading: boolean;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  inputValue,
  setInputValue,
  options,
  renderItem,
  loading,
}) => {
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const bg = useColorModeValue("gray.100", "gray.800");
  const hover = useColorModeValue("whiteAlpha.600", "blackAlpha.600");

  const {
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    isOpen,
    openMenu,
  } = useCombobox({
    items: options,
  });

  return (
    <Box
      position="relative"
      zIndex="toast"
      width="100%"
      {...getComboboxProps()}
    >
      <Input
        width="100%"
        placeholder="Search.."
        {...getInputProps({
          value: inputValue,
          onChange: handleInputChange,
          onClick: openMenu,
          // onClick:
        })}
      />
      <List
        {...getMenuProps()}
        position="absolute"
        maxH="325px"
        overflowY="auto"
        backgroundColor={bg}
        py={isOpen ? 2 : 0}
        left="0"
        right="0"
        width="100%"
        px={isOpen ? 4 : 0}
      >
        {isOpen &&
          (!loading === true ? (
            options.length > 0 ? (
              options.map((item, index) => (
                <ListItem
                  _notLast={{
                    mb: 2,
                  }}
                  _hover={{
                    bg: hover,
                  }}
                  p={2}
                  borderRadius="md"
                  width="100%"
                  key={item.id}
                  cursor="pointer"
                  {...getItemProps({ item, index })}
                >
                  {renderItem(item)}
                </ListItem>
              ))
            ) : (
              <Text>No result.</Text>
            )
          ) : (
            <Center py={2} overflow="hidden">
              <CircularProgress isIndeterminate color="green.300" size="24px" />
            </Center>
          ))}
      </List>
    </Box>
  );
};

export default RecForm;
