/** @type import('hardhat/config').HardhatUserConfig */
// eslint-disable-next-line
require("dotenv").config();
// eslint-disable-next-line
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      viaIR: true,
    }
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
  },
};


