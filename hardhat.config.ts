import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY = `d73cccb9c7227d1301640bf81d3dd750fcdf79e5e49d749b5e37485887183abb`;
const INFURA_PROJECT_ID = `017c9e17b5ca4d8f817be5300d389438`;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
};

export default config;
