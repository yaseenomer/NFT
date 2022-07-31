import {
  ChakraProvider,
  Flex,
  Heading,
  Box,
  ButtonGroup,
  Spacer,
  Button,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import Link from "next/link";

import React from "react";
import ToggleColorMode from "../component/toggleColorMode";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">NFT App</Heading>
        </Box>
        <ButtonGroup gap="2" p={2}>
          <Link href="/">Items</Link>
          <Link href="/create-item">Create Item</Link>
        </ButtonGroup>

        <ToggleColorMode />
      </Flex>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
