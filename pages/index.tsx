import { useSession } from "next-auth/client";
import { Text } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";

const NextAuth = () => {
  const [session, loading] = useSession();

  // If no session exists, display access denied message
  if (!session) {
    return <div>Access denied</div>;
  }

  // If session exists, display content

  return (
    <Layout>
      <Text noOfLines={2}>
        "The quick brown fox jumps over the lazy dog" is an English-language
        pangram—a sentence that contains all of the letters of the English
        alphabet. Owing to its existence, Chakra was created.
      </Text>
    </Layout>
  );
};

export default NextAuth;
