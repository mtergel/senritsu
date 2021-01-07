import { extendTheme } from "@chakra-ui/react";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const theme = extendTheme({
  fonts: {
    body: "'Raleway', sans-serif",
    heading: "'Open Sans', sans-serif",
  },
  config,
});
export default theme;
