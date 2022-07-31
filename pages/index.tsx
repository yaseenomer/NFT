import {
  Flex,
  Heading,
  Button,
  Box,
  Spacer,
  ButtonGroup,
  Grid,
  GridItem,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

import React from "react";
import { ethers } from "ethers";

import NFT from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { getProvider, lockAddress } from "../config/config";
import ItemCard from "../component/itemCard";

export default function Home() {
  const [items, setItems] = React.useState([]);

  const getLock = async () => {
    try {
      const provider = await getProvider();

      const contract = new ethers.Contract(lockAddress, NFT.abi, provider);
      const data = await contract.fetchMarketItems();

      const items: any = await Promise.all(
        data.map(async (i: any) => {
          const tokenUri = await contract.tokenURI(i.tokenId);

          const res = await fetch(tokenUri);
          const meta = await res.json();
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta?.image,
            name: meta?.name,
            description: meta?.description,
          };
          return item;
        })
      );
      setItems(items);
    } catch (error) {
      console.log("Error fetching items: ", error);
    }
  };

  React.useEffect(() => {
    getLock();
  }, []);

  return (
    <Box m={10}>
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing="20px">
        {items.map((item: any, key) => (
          <Box key={key} w="100%" h="100%">
            <ItemCard item={item}></ItemCard>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
