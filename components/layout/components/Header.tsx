import {
  Box,
  Container,
  useColorMode,
  Flex,
  Spacer,
  IconButton,
  Icon,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoLogoGithub, IoMoon, IoSunny } from "react-icons/io5";
import path from "./svgPath";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box width="100%" zIndex={10}>
      <Container
        maxWidth="100%"
        paddingLeft={["1rem", "1rem", "4rem"]}
        paddingRight={["1rem", "1rem", "4rem"]}
      >
        <noscript>
          <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
        </noscript>
        <Box className={"nojs-show"}>
          <Flex width="100%" alignItems="center" height="100px">
            <Link href="/" passHref>
              <Box as="a" aria-label="Home">
                <Box
                  as="svg"
                  height="2rem"
                  width="auto"
                  fill="none"
                  viewBox="0 0 64 17"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={path} fill="currentColor" />
                </Box>
              </Box>
            </Link>
            <Spacer />
            <Flex>
              <HStack spacing={["12px", "24px"]}>
                <Link href="https://github.com/mtergel/senritsu" passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <Icon
                      as={IoLogoGithub}
                      fontSize="3xl"
                      opacity="0.8"
                      transition="opacity 0.2s"
                      _hover={{
                        opacity: 1,
                      }}
                      aria-label="Github"
                    />
                  </a>
                </Link>
                <IconButton
                  onClick={toggleColorMode}
                  variant="ghost"
                  aria-label="toggle theme"
                  opacity="0.8"
                  transition="opacity 0.2s"
                  _hover={{
                    opacity: 1,
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  {colorMode === "light" ? (
                    <Icon as={IoMoon} fontSize="xl" />
                  ) : (
                    <Icon as={IoSunny} fontSize="xl" />
                  )}
                </IconButton>
              </HStack>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
export default Header;
