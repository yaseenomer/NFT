import React from "react";

import { useColorMode, Button } from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
