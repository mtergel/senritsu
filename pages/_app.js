import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import theme from "../styles/theme";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="static/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="static/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="static/favicon-16x16.png"
        />
        <link rel="manifest" href="static/site.webmanifest" />
        <link
          rel="mask-icon"
          href="static/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <title>Senritsu - Make your perfect playlist</title>
        <meta
          name="description"
          content="Senritsu. Make your perfect playlist. Senritsu uses Spotify's API to generate recommendations that you quickly add to your playlist."
        />
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://senritsu.vercel.app"></meta>
        <meta
          property="og:title"
          content={"Senritsu - Make your perfect playlist"}
          key="ogtitle"
        />
        <meta
          property="og:image"
          content="https://senritsu.vercel.app/static/meta.png"
        />
        <meta
          property="og:description"
          content={
            "Get music recommendations based on your listening history and add them to your playlist"
          }
          key="ogdesc"
        />
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta
          property="twitter:url"
          content="https://senritsu.vercel.app"
        ></meta>
        <meta
          property="twitter:title"
          content="Senritsu - Make your perfect playlist"
        ></meta>
        <meta
          property="twitter:description"
          content="Get music recommendations based on your listening history and add them to your playlist"
        ></meta>
        <meta
          property="twitter:image"
          content="https://senritsu.vercel.app/static/meta.png"
        ></meta>
      </Head>

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
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
