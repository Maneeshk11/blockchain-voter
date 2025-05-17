"use client";

import { VOTING_CONTRACT_ABI, VOTING_CONTRACT_ADDRESS } from "@/lib/constants";
import { useReadContract } from "wagmi";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ElectionData, FormattedElection } from "@/lib/utils/types";
import formatElections from "@/lib/utils/election";

const Elections = () => {
  const {
    data: electionsData,
    error,
    isLoading,
  } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: "getElections",
    chainId: 11155111,
  });

  if (isLoading) {
    return <div>Loading elections...</div>;
  }

  if (error) {
    console.error("Contract error:", error);
    return <div>Error loading elections: {error.message}</div>;
  }

  const formattedElections = formatElections(electionsData as ElectionData);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {formattedElections.length > 0 ? (
        formattedElections.map((election: FormattedElection) => (
          <div
            key={election.id}
            className="p-4 border rounded shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">{election.name}</span>
                <span className="text-sm text-gray-600">
                  Proposals: {election.proposalCount}
                </span>
              </div>

              <Link href={`/elections/${election.id}`}>
                <Button className="cursor-pointer">View & Vote</Button>
              </Link>
            </div>
            <Separator />
            <span className="text-sm text-gray-600 line-clamp-2">
              {election.description}
            </span>
          </div>
        ))
      ) : (
        <div className="p-4 border rounded text-center">No elections found</div>
      )}
    </div>
  );
};

export default Elections;
