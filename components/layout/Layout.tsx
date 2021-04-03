import { Box } from "@chakra-ui/react";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Box as="main" flex="1 1 0%" height="100%">
        {children}
      </Box>
    </>
  );
};
export default Layout;
