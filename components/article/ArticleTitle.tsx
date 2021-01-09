import Link from "next/link";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

interface ArticleTitleProps {
  title: string;
  subTitle?: string;
  link?: string;
}

const ArticleTitle: React.FC<ArticleTitleProps> = ({
  title,
  subTitle,
  link,
}) => {
  return (
    <Box mb={"16px"}>
      <Heading mb={4}>{title}</Heading>
      <Flex alignItems="center">
        <Text>{subTitle}</Text>
        <Spacer />
        {link && (
          <Link href={link} passHref>
            <Box
              as="a"
              cursor="pointer"
              px={"16px"}
              display="flex"
              height="40px"
              alignItems="center"
              borderRadius="3px"
              color={"#b3b3b3"}
            >
              <Heading size="sm" minW="60px">
                SEE ALL
              </Heading>
            </Box>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default ArticleTitle;
