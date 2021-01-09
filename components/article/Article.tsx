import { Box } from "@chakra-ui/react";

const Article: React.FC<{}> = ({ children }) => {
  return (
    <Box
      px={5}
      py={3}
      // py={[8, 8, 16]}
      // px={[8, 16, 32]}
      as="article"
      width="100%"
      height="100%"
    >
      {children}
    </Box>
  );
};

export default Article;
