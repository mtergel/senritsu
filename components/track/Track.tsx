import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { msConvertor } from "../../lib/helper/msConvertor";

const testData = {
  album: {
    album_type: "SINGLE",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/2wBpW4bAGYVe0yJcBeCTyd",
        },
        href: "https://api.spotify.com/v1/artists/2wBpW4bAGYVe0yJcBeCTyd",
        id: "2wBpW4bAGYVe0yJcBeCTyd",
        name: "２８１４",
        type: "artist",
        uri: "spotify:artist:2wBpW4bAGYVe0yJcBeCTyd",
      },
    ],
    available_markets: [
      "AD",
      "AE",
      "AL",
      "AR",
      "AT",
      "AU",
      "BA",
      "BE",
      "BG",
      "BH",
      "BO",
      "BR",
      "BY",
      "CA",
      "CH",
      "CL",
      "CO",
      "CR",
      "CY",
      "CZ",
      "DE",
      "DK",
      "DO",
      "DZ",
      "EC",
      "EE",
      "EG",
      "ES",
      "FI",
      "FR",
      "GB",
      "GR",
      "GT",
      "HK",
      "HN",
      "HR",
      "HU",
      "ID",
      "IE",
      "IL",
      "IN",
      "IS",
      "IT",
      "JO",
      "JP",
      "KW",
      "KZ",
      "LB",
      "LI",
      "LT",
      "LU",
      "LV",
      "MA",
      "MC",
      "MD",
      "ME",
      "MK",
      "MT",
      "MX",
      "MY",
      "NI",
      "NL",
      "NO",
      "NZ",
      "OM",
      "PA",
      "PE",
      "PH",
      "PL",
      "PS",
      "PT",
      "PY",
      "QA",
      "RO",
      "RS",
      "RU",
      "SA",
      "SE",
      "SG",
      "SI",
      "SK",
      "SV",
      "TH",
      "TN",
      "TR",
      "TW",
      "UA",
      "US",
      "UY",
      "VN",
      "XK",
      "ZA",
    ],
    external_urls: {
      spotify: "https://open.spotify.com/album/4ZAW0ziyW8f2ZW8uzynYWA",
    },
    href: "https://api.spotify.com/v1/albums/4ZAW0ziyW8f2ZW8uzynYWA",
    id: "4ZAW0ziyW8f2ZW8uzynYWA",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b2734c75ba0f1256d653494aca8d",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e024c75ba0f1256d653494aca8d",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d000048514c75ba0f1256d653494aca8d",
        width: 64,
      },
    ],
    name: "Voyage / Embrace",
    release_date: "2020-09-09",
    release_date_precision: "day",
    total_tracks: 2,
    type: "album",
    uri: "spotify:album:4ZAW0ziyW8f2ZW8uzynYWA",
  },
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/2wBpW4bAGYVe0yJcBeCTyd",
      },
      href: "https://api.spotify.com/v1/artists/2wBpW4bAGYVe0yJcBeCTyd",
      id: "2wBpW4bAGYVe0yJcBeCTyd",
      name: "２８１４",
      type: "artist",
      uri: "spotify:artist:2wBpW4bAGYVe0yJcBeCTyd",
    },
  ],
  available_markets: [
    "AD",
    "AE",
    "AL",
    "AR",
    "AT",
    "AU",
    "BA",
    "BE",
    "BG",
    "BH",
    "BO",
    "BR",
    "BY",
    "CA",
    "CH",
    "CL",
    "CO",
    "CR",
    "CY",
    "CZ",
    "DE",
    "DK",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "ES",
    "FI",
    "FR",
    "GB",
    "GR",
    "GT",
    "HK",
    "HN",
    "HR",
    "HU",
    "ID",
    "IE",
    "IL",
    "IN",
    "IS",
    "IT",
    "JO",
    "JP",
    "KW",
    "KZ",
    "LB",
    "LI",
    "LT",
    "LU",
    "LV",
    "MA",
    "MC",
    "MD",
    "ME",
    "MK",
    "MT",
    "MX",
    "MY",
    "NI",
    "NL",
    "NO",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PH",
    "PL",
    "PS",
    "PT",
    "PY",
    "QA",
    "RO",
    "RS",
    "RU",
    "SA",
    "SE",
    "SG",
    "SI",
    "SK",
    "SV",
    "TH",
    "TN",
    "TR",
    "TW",
    "UA",
    "US",
    "UY",
    "VN",
    "XK",
    "ZA",
  ],
  disc_number: 1,
  duration_ms: 838000,
  explicit: true,
  external_ids: {
    isrc: "USA2P2032401",
  },
  external_urls: {
    spotify: "https://open.spotify.com/track/0J7u52JYQOOTshD8jSBvIj",
  },
  href: "https://api.spotify.com/v1/tracks/0J7u52JYQOOTshD8jSBvIj",
  id: "0J7u52JYQOOTshD8jSBvIj",
  is_local: false,
  name: "Embrace",
  popularity: 29,
  preview_url:
    "https://p.scdn.co/mp3-preview/43e2f34b9d88fef5a82d5cdcc8090e8c93bf6439?cid=d7a132f24f5a4c7b99a5cd8e39c39642",
  track_number: 2,
  type: "track",
  uri: "spotify:track:0J7u52JYQOOTshD8jSBvIj",
};
const Track: React.FC<{}> = () => {
  const bg = useColorModeValue("gray.50", "hsla(0,0%,100%,.1)");
  const trackLen = msConvertor(testData.duration_ms);

  return (
    <Box
      border="1px solid transparent"
      borderRadius="4px"
      transition="background-color ease 0.15s"
      _hover={{
        backgroundColor: bg,
      }}
    >
      <Grid
        templateColumns="[index] 16px [first] 4fr [last] minmax(120px,1fr)"
        height="56px"
        width="100%"
        padding="8px 16px"
        gap="16px"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          role="gridcell"
          aria-colindex={1}
          tabIndex={-1}
        >
          1
        </Box>
        <Box
          role="gridcell"
          aria-colindex={2}
          tabIndex={-1}
          display="flex"
          alignItems="center"
        >
          <Flex pr={"8px"} justifyContent="flex-start" flexDir="column">
            <Heading size="sm" isTruncated justifySelf="start" mb={1.8}>
              {testData.name}
            </Heading>
            <Flex>
              {testData.explicit && (
                <Badge colorScheme="purple" mr={2}>
                  Explicit
                </Badge>
              )}
              <Text as="div" fontSize="sm" isTruncated>
                {testData.artists.map((a) => (
                  <div key={a.id}>{a.name}</div>
                ))}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box
          role="gridcell"
          aria-colindex={3}
          tabIndex={-1}
          display="flex"
          alignItems="center"
        >
          <div>{trackLen}</div>
        </Box>
      </Grid>
    </Box>
  );
};

export default Track;
