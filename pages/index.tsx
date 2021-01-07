import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import Nav from "../components/nav";

const NextAuth = ({ content, session }) => {
  // If no session exists, display access denied message
  if (!session) {
    return <Nav />;
  }
  console.log("content in client: ", content);
  // If session exists, display content
  return (
    <>
      <Nav />
      <main>
        <h1>NextAuth.js Demo</h1>
      </main>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  let content = null;

  if (session && session.accessToken) {
    // const hostname = process.env.NEXTAUTH_URL || "http://localhost:3001";
    // const options = {
    //   headers: {
    //     cookie: ctx.req.headers.cookie,
    //   },
    // };
    // const res = await fetch(`${hostname}/api/spotify/top/tracks`, options);
    const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    });
    const json = await res.json();
    if (json) {
      content = json;
    }
  }

  return {
    props: {
      session,
      content,
    },
  };
}

export default NextAuth;
