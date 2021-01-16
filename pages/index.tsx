import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import { Heading } from "@chakra-ui/react";
import { Chakra } from "../components/wrapper/Chakra";
import Layout from "../components/layout/Layout";

const NextAuth = ({ content, session, cookies, error }) => {
  if (error) {
    return (
      <Chakra cookies={cookies}>
        <h1>{error}</h1>
      </Chakra>
    );
  }
  // If no session exists, display access denied message
  if (!session) {
    return (
      <Chakra cookies={cookies}>
        <div>Access denied</div>
      </Chakra>
    );
  }
  console.log("content in client: ", content);
  // If session exists, display content
  return (
    <Chakra cookies={cookies}>
      <Layout>
        <Heading>Home page</Heading>
      </Layout>
    </Chakra>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  let content = null;
  const hostname = process.env.NEXTAUTH_URL || "http://localhost:3001";
  if (session && session.accessToken) {
    // try {
    //   const call = await axios.get("https://api.spotify.com/v1/me/playlists", {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + session.accessToken,
    //     },
    //   });
    //   const data = call.data;
    //   if (data) {
    //     content = data;
    //   }
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     ctx.res.statusCode = 302;
    //     ctx.res.setHeader("Location", `${hostname}/auth/signin`);
    //     ctx.res.end();
    //     return {
    //       props: {},
    //     };
    //   } else {
    //     return {
    //       props: {
    //         session,
    //         content,
    //         cookies: ctx.req.headers.cookie ?? "",
    //         error: "Something happend",
    //       },
    //     };
    //   }
    // }
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

export default NextAuth;
