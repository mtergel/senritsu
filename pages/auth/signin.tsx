import { NextPageContext } from "next";
import { signIn } from "next-auth/client";
import { Chakra } from "../../components/wrapper/Chakra";
import Head from "next/head";

const hostname = process.env.NEXTAUTH_URL || "http://localhost:3001";

export default function SignIn({ cookies }) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${hostname}/static/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${hostname}/static/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${hostname}/static/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${hostname}/static/site.webmanifest`} />
        <link
          rel="mask-icon"
          href={`${hostname}/static/safari-pinned-tab.svg`}
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>Senritsu - Generate your playlist</title>
      </Head>
      <Chakra cookies={cookies}>
        <div>
          <button onClick={() => signIn("spotify", { callbackUrl: hostname })}>
            Login with spotify
          </button>
        </div>
      </Chakra>
    </>
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
