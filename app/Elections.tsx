"use client";

import { VOTING_CONTRACT_ABI, VOTING_CONTRACT_ADDRESS } from "@/lib/constants";
import { useReadContract } from "wagmi";

import { Separator } from "@/components/ui/separator";
import { ElectionsData, FormattedElection } from "@/lib/utils/types";
import { formatElections } from "@/lib/utils/election";
import { Loader2 } from "lucide-react";
import { useElectionContext } from "../lib/contexts/ElectionContextProvider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import VoteDialog from "./VoteDialog";
import { useVoteContext } from "@/lib/contexts/VoteContextProvider";
const Elections = () => {
  const { refresh, setRefresh } = useElectionContext();
  const { setElectionId } = useVoteContext();
  const [electionDialogOpen, setElectionDialogOpen] = useState<boolean>(false);

  const {
    data: electionsData,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: "getElections",
    chainId: 11155111,
  });

  useEffect(() => {
    if (refresh) {
      refetch();
      setRefresh(false);
    }
  }, [refresh, refetch, setRefresh]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-10">
        <span>Loading elections</span>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    console.error("Contract error:", error);
    return <div>Error loading elections: {error.message}</div>;
  }

  const formattedElections = formatElections(electionsData as ElectionsData);

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
              <Button
                className="cursor-pointer"
                onClick={() => {
                  setElectionId(election.id);
                  setElectionDialogOpen(true);
                }}
              >
                Vote
              </Button>
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
      <VoteDialog
        open={electionDialogOpen}
        onOpenChange={setElectionDialogOpen}
      />
    </div>
  );
};

export default Elections;
