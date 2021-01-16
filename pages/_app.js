import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
        }
      `}</style>
      <Provider session={session}>
        <ChakraProvider resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
