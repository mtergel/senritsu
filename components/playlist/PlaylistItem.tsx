import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface PlaylistItemProps {
  image: string;
  name: string;
  description: string;
  id: string;
  owner_name?: string;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  image,
  name,
  description,
  id,
  owner_name,
}) => {
  return (
    <Link href={`/playlist/${id}`} passHref>
      <Flex
        flexDir="column"
        borderRadius="12px"
        borderWidth="1px"
        padding={"16px"}
        transition="background-color .3s ease"
        id={id}
        as="a"
      >
        <Image src={image} mb={4} />
        <Heading fontSize="lg" isTruncated mb={2}>
          {name}
        </Heading>
        <Text color="gray.500" isTruncated noOfLines={2}>
          {description}
        </Text>
        {owner_name && (
          <Text color="gray.500" isTruncated>{`By ${owner_name}`}</Text>
        )}
      </Flex>
    </Link>
  );
};
export default PlaylistItem;