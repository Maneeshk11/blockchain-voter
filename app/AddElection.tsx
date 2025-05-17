"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { VOTING_CONTRACT_ABI, VOTING_CONTRACT_ADDRESS } from "@/lib/constants";

const AddElection = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [proposals, setProposals] = useState<string[]>([]);

  const { writeContract } = useWriteContract();

  const handleSubmit = () => {
    writeContract({
      address: VOTING_CONTRACT_ADDRESS,
      abi: VOTING_CONTRACT_ABI,
      functionName: "createElection",
      args: [name, description, proposals],
      chainId: 11155111,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <Plus />
          Add Election
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Add Election
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Election Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Election Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Add Proposals
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setProposals([...proposals, ""])}
              >
                <Plus />
              </Button>
            </div>
            {proposals.map((proposal, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Proposal"
                  value={proposal}
                  onChange={(e) =>
                    setProposals(
                      proposals.map((p, i) =>
                        i === index ? e.target.value : p
                      )
                    )
                  }
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setProposals(proposals.filter((_, i) => i !== index))
                  }
                >
                  <Trash className="text-red-500" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="submit"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            Add Election
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddElection;
