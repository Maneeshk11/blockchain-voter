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
import { useWriteContract } from "wagmi";
import { VOTING_CONTRACT_ABI, VOTING_CONTRACT_ADDRESS } from "@/lib/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useEffect } from "react";

const ElectionSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  proposals: z.array(z.string().min(1)),
});

const AddElection = () => {
  const { writeContract, isPending, error, reset } = useWriteContract();

  useEffect(() => {
    const loadingToastId = "creating-election";
    if (isPending) {
      toast.loading("Creating election...", { id: loadingToastId });
    } else {
      toast.dismiss(loadingToastId);
      if (error) {
        toast.error(
          `Failed to create election: ${
            error instanceof Error ? error.message : String(error)
          }`,
          { duration: 6000 }
        );
      }
    }
  }, [isPending, error, reset]);

  const form = useForm<z.infer<typeof ElectionSchema>>({
    resolver: zodResolver(ElectionSchema),
    defaultValues: {
      name: "",
      description: "",
      proposals: [],
    },
  });

  const HandleSubmit = (data: z.infer<typeof ElectionSchema>) => {
    writeContract({
      address: VOTING_CONTRACT_ADDRESS,
      abi: VOTING_CONTRACT_ABI,
      functionName: "createElection",
      args: [data.name, data.description, data.proposals],
      chainId: 11155111,
    });
  };

  return (
    <Dialog
      onOpenChange={() => {
        reset();
        form.reset();
      }}
    >
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
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(HandleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Election Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Election Description</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Election Description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Add Proposals
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      form.setValue("proposals", [
                        ...form.getValues("proposals"),
                        "",
                      ]);
                    }}
                  >
                    <Plus />
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="proposals"
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      {field.value.map((proposal: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            type="text"
                            placeholder="Proposal"
                            value={proposal}
                            onChange={(e) => {
                              const newProposals = [...field.value];
                              newProposals[index] = e.target.value;
                              form.setValue("proposals", newProposals);
                            }}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newProposals = field.value.filter(
                                (_: string, i: number) => i !== index
                              );
                              form.setValue("proposals", newProposals);
                            }}
                          >
                            <Trash className="text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
              <Button type="submit" className="cursor-pointer">
                Add Election
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddElection;
