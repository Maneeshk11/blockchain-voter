"use client";

import { VOTING_CONTRACT_ADDRESS } from "@/lib/constants";
import { useReadContract } from "wagmi";
import Voting from "@/artifacts/contracts/voting.sol/Voting.json";
import { Button } from "@/components/ui/button";

const Proposals = () => {
  const {
    data: proposals,
    error,
    isLoading,
  } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: Voting.abi,
    functionName: "getProposals",
    chainId: 11155111,
  });

  if (isLoading) {
    return <div>Loading proposals...</div>;
  }

  if (error) {
    console.error("Contract error:", error);
    return <div>Error loading proposals: {error.message}</div>;
  }

  // Handle the format of the data coming from the contract
  const proposalArray = Array.isArray(proposals) ? proposals : [];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {proposalArray.length > 0 ? (
        proposalArray.map((proposal, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow-sm flex justify-between items-center"
          >
            <div className="flex flex-col gap-2">
              <div className=" ">{proposal.name}</div>
              <div className="text-sm text-gray-600">
                Total votes: {proposal.votecount}
              </div>
            </div>

            <Button>Vote</Button>
          </div>
        ))
      ) : (
        <div className="p-4 border rounded text-center">No proposals found</div>
      )}
    </div>
  );
};

export default Proposals;
