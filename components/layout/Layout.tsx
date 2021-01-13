import { Box, Container } from "@chakra-ui/react";
import Header from "./components/Header";
import Scrollbar from "react-scrollbars-custom";
import Head from "next/head";
import Sidebar from "./components/Sidebar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
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
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>Senritsu - Generate your playlist</title>
      </Head>
      <Box height="100%" width="100%">
        <Scrollbar
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Header />
          <Container maxWidth="85rem" display="flex">
            <Sidebar />
            <Box as="main" marginTop="8.5rem" flex="1 1 0%">
              {children}
            </Box>
          </Container>
        </Scrollbar>
      </Box>
    </>
  );
};
export default Layout;
