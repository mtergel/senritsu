import {
  Box,
  Flex,
  Heading,
  Image,
  Spacer,
  Stat,
  StatGroup,
  StatLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import { Chakra } from "../../components/wrapper/Chakra";

const PlaylistPage = ({ session, content, cookies }) => {
  console.log("content on cliet: ", content);

  return (
    <Chakra cookies={cookies}>
      <Head>
        <title>{`Senritsu - ${content.name}`}</title>
      </Head>
      <Layout>
        <Box>
          <Flex
            flexDir={["column", "row"]}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              aria-hidden="false"
              draggable="false"
              loading="eager"
              src={content.images[0].url}
              width="232px"
              height="232px"
            />
            <Flex ml={[0, 6]} height="100%" flexDir="column">
              <Heading size="2xl" mt={[4, 0]}>
                {content.name}
              </Heading>
              <Heading size="sm" mt={2} ml={1}>
                {content.description}
              </Heading>
              <StatGroup>
                <Stat>
                  <StatLabel>By</StatLabel>
                  {content.owner.display_name}
                </Stat>
                <Stat>
                  <StatLabel>Likes</StatLabel>
                  {content.followers.total}
                </Stat>
                <Stat>
                  <StatLabel>Songs</StatLabel>
                  {content.tracks.total}
                </Stat>
              </StatGroup>
            </Flex>
            <Spacer />
          </Flex>
        </Box>
      </Layout>
    </Chakra>
  );
};

PlaylistPage.getLayout = (page) => <Layout>{page}</Layout>;
export default PlaylistPage;

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  let content = null;
  const hostname = process.env.NEXTAUTH_URL || "http://localhost:3001";
  const { pid } = ctx.query;
  if (session && session.accessToken) {
    try {
      const call = await axios.get(
        `https://api.spotify.com/v1/playlists/${pid}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + session.accessToken,
          },
        }
      );
      const data = call.data;
      if (data) {
        content = data;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader("Location", `${hostname}/auth/signin`);
        ctx.res.end();
        return {
          props: {},
        };
      } else {
        return {
          props: {
            session,
            content,
            cookies: ctx.req.headers.cookie ?? "",
            error: "Something happend",
          },
        };
      }
    }
  } else {
    ctx.res.statusCode = 302;
    ctx.res.setHeader("Location", `${hostname}/auth/signin`);
    ctx.res.end();
    return {
      props: {},
    };
  }

  return {
    props: {
      session,
      content,
      cookies: ctx.req.headers.cookie ?? "",
    },
  };
}
