import { motion, AnimatePresence } from "framer-motion";
import { Box, Link } from "@chakra-ui/layout";
import { Random } from "unsplash-js/dist/methods/photos/types";
import styles from "./ImageGallery.module.scss";
import { IconButton } from "@chakra-ui/button";
import { VscChevronRight, VscChevronLeft } from "react-icons/vsc";
import { BiLinkExternal } from "react-icons/bi";
import Icon from "@chakra-ui/icon";
import { Skeleton, useColorModeValue } from "@chakra-ui/react";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 25 : -25,
      opacity: 0,
    };
  },
};

interface ImageGalleryProps {
  image: Random;
  direction: number;
  page: number;
  paginate: (newDirection: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  image,
  direction,
  page,
  paginate,
}) => {
  const skeletonStartColor = useColorModeValue("pink.500", "pink.200");
  const skeletonEndColor = useColorModeValue("orange.500", "orange.200");

  if (image) {
    const user = image.user;

    return (
      <Box className={styles.gallery}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            className={styles.image}
            src={image.urls.regular}
            alt={image.alt_description}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            loading="lazy"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 25 },
              opacity: { duration: 0.4 },
            }}
          />
        </AnimatePresence>
        <IconButton
          aria-label="next"
          icon={<VscChevronRight fontSize={24} />}
          onClick={() => paginate(1)}
          position="absolute"
          zIndex={2}
          right={4}
          bg="rgba(0, 0, 0, 0.16)"
          _hover={{
            background: "rgba(0, 0, 0, 0.35)",
          }}
          _active={{
            background: "rgba(0, 0, 0, 0.35)",
          }}
          _focus={{
            boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.6)",
          }}
          color="white"
        />

        <IconButton
          aria-label="prev"
          icon={<VscChevronLeft fontSize={24} />}
          onClick={() => paginate(-1)}
          position="absolute"
          zIndex={2}
          left={4}
          bg="rgba(0, 0, 0, 0.16)"
          _hover={{
            background: "rgba(0, 0, 0, 0.35)",
          }}
          _active={{
            background: "rgba(0, 0, 0, 0.35)",
          }}
          _focus={{
            boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.6)",
          }}
          color="white"
        />

        <motion.div
          key={page}
          className={styles.authorContainer}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{ duration: 1 }}
          exit={{
            opacity: 0,
          }}
        >
          <Box color="white" fontSize="sm">
            Photo by{" "}
            <Link
              isExternal
              color="white"
              _focus={{
                boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.6)",
              }}
              href={`${user.links.html}?utm_source=Senritsu&utm_medium=referral`}
            >
              {user.name}
            </Link>{" "}
            on{" "}
            <Link
              isExternal
              color="white"
              _focus={{
                boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.6)",
              }}
              href="https://unsplash.com/?utm_source=Senritsu&utm_medium=referral"
            >
              Unsplash
            </Link>
          </Box>
        </motion.div>
      </Box>
    );
  } else {
    return (
      <Skeleton
        height="100%"
        width="100%"
        startColor={skeletonStartColor}
        endColor={skeletonEndColor}
        speed={1.8}
      />
    );
  }
};

export default ImageGallery;
