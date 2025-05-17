// Using require style for compatibility
// eslint-disable-next-line
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the chain ID to confirm we're on Sepolia
  const chainId = await hre.network.provider.send("eth_chainId");
  console.log("Current network chain ID:", parseInt(chainId, 16));
  
  const Voting = await hre.ethers.getContractFactory("Voting");
  const proposalNames = ["Proposal 1", "Proposal 2", "Proposal 3"];
  console.log("Deploying with proposals:", proposalNames);
  
  const voting = await Voting.deploy(proposalNames);

  await voting.waitForDeployment();
  const votingAddress = await voting.getAddress();
  console.log("Contract Deployed to Address:", votingAddress);
  
  // Verify the contract deployed correctly by calling getProposals
  try {
    console.log("Verifying contract by calling getProposals...");
    const proposals = await voting.getProposals();
    console.log("Retrieved proposals successfully:");
    console.log(proposals);
  } catch (error) {
    console.error("Error verifying contract:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 

