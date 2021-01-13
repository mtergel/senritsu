import {
  Box,
  Container,
  useColorMode,
  Avatar,
  Flex,
  Spacer,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  HStack,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Heading,
  Text,
} from "@chakra-ui/react";
import { signout, useSession, signIn } from "next-auth/client";
import Link from "next/link";
import { useRef } from "react";
import { IoLogoGithub, IoMoon, IoSunny, IoMenu } from "react-icons/io5";
import { menuItems, MenuItem as NavItem } from "./Sidebar";
import path from "./svgPath";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [session] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#FFFFFF", "#000000");
  const sw = useColorModeValue(
    "rgba(0, 0, 0, 0.05)",
    "rgba(255, 255, 255, 0.08)"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Box
        as="header"
        position="fixed"
        left={0}
        right={0}
        top={0}
        width="100%"
        backgroundColor={bg}
        transition="background-color 0.2s"
        boxShadow={`0 1px 2px 0 ${sw}`}
        zIndex={10}
      >
        <Container maxW="1328px">
          <noscript>
            <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
          </noscript>
          <Box className={"nojs-show"}>
            <Flex width="100%" alignItems="center" height="100px">
              <Link href="/" passHref>
                <Box as="a">
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
              {!session && (
                <>
                  <a
                    href={`/api/auth/signin`}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("spotify");
                    }}
                  >
                    <button>Sign in</button>
                  </a>
                </>
              )}
              {session && (
                <Flex>
                  <HStack
                    spacing={["12px", "24px"]}
                    marginRight={["12px", "48px"]}
                  >
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
                    <Box
                      display={["block", "block", "none"]}
                      ref={btnRef}
                      onClick={onOpen}
                    >
                      <IconButton
                        aria-label="menu"
                        variant="ghost"
                        opacity="0.8"
                        transition="opacity 0.2s"
                        _hover={{
                          opacity: 1,
                        }}
                        _focus={{
                          boxShadow: "none",
                        }}
                      >
                        <Icon as={IoMenu} fontSize="2xl" />
                      </IconButton>
                    </Box>
                  </HStack>

                  <Box display={["none", "none", "block"]}>
                    <Menu>
                      <MenuButton>
                        <Avatar
                          size="md"
                          name={session.user.name}
                          src={session.user.image}
                        />
                      </MenuButton>
                      <MenuList px={2}>
                        <MenuItem>Profile</MenuItem>
                        <MenuDivider />
                        <MenuItem
                          as="a"
                          href={`/api/auth/signout`}
                          onClick={(e) => {
                            e.preventDefault();
                            signout();
                          }}
                        >
                          Log out
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                </Flex>
              )}
            </Flex>
          </Box>
        </Container>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
              <Flex alignItems="center" as="button">
                <Avatar
                  size="md"
                  name={session.user.name}
                  src={session.user.image}
                  mr={4}
                />
                <Box textAlign="left">
                  <Heading size="sm">{session.user.name}</Heading>
                  <Text fontSize="sm">See your profile</Text>
                </Box>
              </Flex>
              <Box as="ul" listStyleType="none" pt={4}>
                {menuItems.map((item, index) => (
                  <NavItem key={index} item={item} />
                ))}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
export default Header;
