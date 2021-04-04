import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const theme = extendTheme({
  fonts: {
    body: "'Raleway', sans-serif",
    heading: "'Open Sans', sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        color: mode("#1C2D3E", "#FFFFFF")(props),
        bg: mode("#FFFFFF", "#202124")(props),
      },
    }),
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
  },
});
export default theme;
