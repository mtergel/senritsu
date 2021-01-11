import { Box, Button, Flex } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import RecForm from "../../components/generate/RecForm";
import Layout from "../../components/layout/Layout";
import { Chakra } from "../../components/wrapper/Chakra";

const Generate = ({ session, content, cookies }) => {
  return (
    <Chakra cookies={cookies}>
      <Layout>
        <Box>
          <div>Hello, Generate your playlist based on what your feeling.</div>
          <RecForm />
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
