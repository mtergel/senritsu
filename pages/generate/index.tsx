import { Box } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import { useState } from "react";
import RecForm from "../../components/generate/RecForm";
import Layout from "../../components/layout/Layout";
import { Chakra } from "../../components/wrapper/Chakra";
import Track from "../../components/track/Track";

const Generate = ({ session, content, cookies }) => {
  const [submit, setSubmit] = useState(false);
  const [tracks, setTracks] = useState<null | any[]>(null);

  const handleSubmit = (value: boolean) => {
    setSubmit(value);
  };
  const handleSetTracks = (values: any[]) => {
    setTracks(values);
  };

  return (
    <Chakra cookies={cookies}>
      <Layout>
        <Box>
          <Track />
          {/* {tracks ? (
            tracks.map((i) => <div key={i.id}>{i.name}</div>)
          ) : (
            <>
              <div>
                Hello, Generate your playlist based on what your feeling.
              </div>

              <RecForm
                submit={submit}
                setSubmit={handleSubmit}
                setTracks={handleSetTracks}
              />
            </>
          )} */}
        </Box>
      </Layout>
    </Chakra>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  let content = null;
  const hostname = process.env.NEXTAUTH_URL || "http://localhost:3001";
  if (session && session.accessToken) {
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

export default Generate;
