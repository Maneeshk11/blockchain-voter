// eslint-disable-next-line
const hre = require("hardhat");

async function main() {
  try {
    // The address from your constants.ts file
    const contractAddress = "0xAf22269d4F891c4E7c8be708d9a25794E9dD3b5B";
    
    // Just to verify we're on the right network
    const chainId = await hre.network.provider.send("eth_chainId");
    console.log("Current network chain ID:", parseInt(chainId, 16));
    
    // Get the contract factory and attach to the deployed address
    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = Voting.attach(contractAddress);
    
    console.log("Checking contract at:", contractAddress);
    
    // Try a simpler call first to verify the contract exists
    try {
      const proposalCount = await voting.proposals(0);
      console.log("First proposal found:", proposalCount);
    } catch (error) {
      console.error("Error calling proposals(0):", error.message);
    }
    
    // Now try the getProposals function
    try {
      const proposals = await voting.getProposals();
      console.log("Proposals:", proposals);
    } catch (error) {
      console.error("Error calling getProposals():", error.message);
    }
  } catch (error) {
    console.error("General error:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 