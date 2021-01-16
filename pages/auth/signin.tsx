import { Box, Heading, Image } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { signIn } from "next-auth/client";
import { Chakra } from "../../components/wrapper/Chakra";

const hostname = process.env.NEXTAUTH_URL || "http://localhost:3001";

export default function SignIn({ cookies }) {
  return (
    <Chakra cookies={cookies}>
      <Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxShadow="xl"
            px={6}
            py={4}
            borderRadius={8}
            onClick={() => signIn("spotify", { callbackUrl: hostname })}
            cursor="pointer"
          >
            <Heading mr={4} size="lg">
              Login with
            </Heading>
            <Image src={"/Spotify-Logo.png"} width="48px" />
          </Box>
        </Box>
      </Box>
    </Chakra>
  );
}
export async function getServerSideProps(ctx: NextPageContext) {
  //   const session = await getSession(ctx);
  //   if (session) {
  //     ctx.res.statusCode = 302;
  //     ctx.res.setHeader("Location", `${hostname}`);
  //     ctx.res.end();
  //   } else {
  //     return {
  //   props: {
  //     cookies: ctx.req.headers.cookie ?? "",
  //   },
  //     };
  //   }
  return {
    props: {
      cookies: ctx.req.headers.cookie ?? "",
    },
  };
}
