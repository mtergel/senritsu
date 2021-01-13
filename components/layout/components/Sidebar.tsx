import { Box, Icon, Heading, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import NextLink from "next/link";
import { useRouter } from "next/router";

// Icons
import { IoHomeOutline, IoMusicalNotesOutline } from "react-icons/io5";
interface MenuItem {
  icon: IconType;
  title: string;
  link: string;
}

export const menuItems = [
  {
    icon: IoHomeOutline,
    title: "Home",
    link: "/",
  },
  {
    icon: IoMusicalNotesOutline,
    title: "Generate",
    link: "/generate",
  },
] as MenuItem[];

const Sidebar: React.FC<{}> = () => {
  const router = useRouter();
  return (
    <Box
      as="nav"
      width="280px"
      marginTop="8.5rem"
      px={5}
      py={3}
      display={["none", "none", "block"]}
    >
      <Box as="ul" listStyleType="none">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            active={router.pathname === item.link}
          />
        ))}
      </Box>
    </Box>
  );
};
export default Sidebar;

interface MenuItemProps {
  large?: boolean;
  active?: boolean;
  item: MenuItem;
}

export const MenuItem: React.FC<MenuItemProps> = ({ large, item, active }) => {
  const color = useColorModeValue("#000000", "#FFFFFF");
  return (
    <Box as="li">
      <NextLink href={item.link} passHref>
        <Box
          as="a"
          cursor="pointer"
          px={"16px"}
          display="flex"
          height="40px"
          alignItems="center"
          borderRadius="3px"
          color={active ? color : "rgb(113, 128, 150)"}
          transitionProperty="color"
          transitionDuration=".2s"
          transitionTimingFunction="ease-in-out"
          _hover={{
            color: color,
          }}
        >
          <Icon as={item.icon} marginRight="16px" fontSize="24px" />
          <Heading size="sm">{item.title}</Heading>
        </Box>
      </NextLink>
    </Box>
  );
};
