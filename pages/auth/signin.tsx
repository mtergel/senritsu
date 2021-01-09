import { NextPageContext } from "next";
import { signIn } from "next-auth/client";
import { Chakra } from "../../components/wrapper/Chakra";

const hostname = process.env.NEXTAUTH_URL || "http://localhost:3001";

export default function SignIn({ cookies }) {
  return (
    <Chakra cookies={cookies}>
      <div>
        <button onClick={() => signIn("spotify", { callbackUrl: hostname })}>
          Login with spotify
        </button>
      </div>
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
