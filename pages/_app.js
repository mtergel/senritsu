import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Provider session={session}>
          <Component {...pageProps} />
        </Provider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
