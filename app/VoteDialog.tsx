"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VOTING_CONTRACT_ABI, VOTING_CONTRACT_ADDRESS } from "@/lib/constants";
import { FC } from "react";
import { useReadContract } from "wagmi";
import { useVoteContext } from "@/lib/contexts/VoteContextProvider";
import { formatElection } from "@/lib/utils/election";
import { ElectionData } from "@/lib/utils/types";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useWriteContract } from "wagmi";

const voteFormSchema = z.object({
  proposalId: z.string().min(1),
});

interface VoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VoteDialog: FC<VoteDialogProps> = ({ open, onOpenChange }) => {
  const { electionId } = useVoteContext();
  const { writeContract } = useWriteContract();

  const form = useForm<z.infer<typeof voteFormSchema>>({
    resolver: zodResolver(voteFormSchema),
    defaultValues: {
      proposalId: "",
    },
  });

  const onSubmit = (data: z.infer<typeof voteFormSchema>) => {
    writeContract({
      address: VOTING_CONTRACT_ADDRESS,
      abi: VOTING_CONTRACT_ABI,
      functionName: "vote",
      args: [electionId, Number(data.proposalId)],
    });
  };

  const { data: election, isLoading } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: "getElection",
    chainId: 11155111,
    args: [electionId],
  });

  const formattedElection = election
    ? formatElection(election as ElectionData)
    : { name: "", description: "", proposals: [] };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vote</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-lg font-medium">
                {formattedElection.name}
              </span>
              <Separator />
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      name="proposalId"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-500">
                            {formattedElection.description}
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              {formattedElection.proposals?.map((proposal) => (
                                <div
                                  key={proposal.id}
                                  className="flex items-center justify-between"
                                >
                                  <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                      <RadioGroupItem
                                        className="border-gray-300"
                                        key={proposal.id}
                                        value={proposal.id.toString()}
                                      />
                                    </FormControl>
                                    <span>{proposal.name}</span>
                                  </FormItem>
                                  <span className="text-sm text-gray-500">
                                    {proposal.votecount}
                                  </span>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Vote</Button>
                  </form>
                </Form>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VoteDialog;
