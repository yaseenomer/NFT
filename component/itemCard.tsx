import React from "react";
import styles from "../styles/styles.module.css";
import { Box, Image, Badge, useColorModeValue } from "@chakra-ui/react";

export default function ItemCard({ item }) {
  const background = useColorModeValue("gray.100", "gray.700");
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      rounded={20}
      bgColor={background}
      p={2}
    >
      <Image src={item?.image} rounded={20} alt="image" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {" "}
            &bull; {item?.name}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {item?.description}
        </Box>

        <Box>
          {item?.price}
          <Box as="span" color="gray.600" fontSize="sm">
            / ether
          </Box>
        </Box>

        {/* <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}
