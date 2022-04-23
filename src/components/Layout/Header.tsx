import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  StyleProps,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useRari } from "context/RariContext";
import { Button, Heading, Link, Text } from "rari-components";
import { truncate } from "utils/stringUtils";
import { useNetwork } from "wagmi";

import ConnectModal from "./modals/ConnectModal";

type HeaderProps = BoxProps & {
  /**
   * Styles to be passed to the `sx` prop of the inner Box containing the
   * Header content (not the background).
   */
  contentSx: StyleProps;
};

const Header: React.FC<HeaderProps> = ({ contentSx, ...restProps }) => {
  const { isAuthed, address, logout, login, previewMode } = useRari();
  const network = useNetwork();
  const [
    {
      data: {
        chain,
      },
    },
  ] = network;

  const handleClick = () => {
    if (isAuthed) {
      logout();
    } else {
      login();
    }
  };

  return (
    <Box
      bg="darkmatte"
      color="white"
      paddingTop={4}
      position="relative"
      overflowX="hidden"
      {...restProps}
    >
      <Box position="relative" zIndex={1} sx={contentSx}>
        <HStack alignItems="center" spacing={12} width="100%">
          <HStack spacing={12}>
            <HStack spacing={4}>
              <Link href="/">Tribe Convex Pool</Link>
            </HStack>
            <Menu>
              <MenuButton fontWeight={600}>
                More <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link href="/faq" color="black">
                    FAQ
                  </Link>
                </MenuItem>

                <MenuItem>
                  <ChakraLink
                    fontWeight={600}
                    href="https://app.rari.capital/fuse/pool/156"
                    color="black"
                  >
                    Rari Capital Dapp
                  </ChakraLink>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          {/* <Link href="/claim">Rewards</Link> */}
          <Spacer />
          <HStack align={"flex-start"}>
            {/* <WarningIcon w={2} h={2} color="red.500" /> */}
            <Button
              onClick={handleClick}
              bg={previewMode ? "warning" : undefined}
            >
              {!!address ? truncate(address ?? "", 8) : "Connect"}
            </Button>
            <Text>Network: {chain?.id}</Text>
          </HStack>
          <ConnectModal />
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
