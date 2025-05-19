"use client";
import { createContext, FC, useContext, useState } from "react";

type VoteContextType = {
  electionId: number;
  setElectionId: (id: number) => void;
};

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const useVoteContext = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error("useVoteContext must be used within a VoteContextProvider");
  }
  return context;
};

interface VoteContextProviderProps {
  children: React.ReactNode;
}

export const VoteContextProvider: FC<VoteContextProviderProps> = ({
  children,
}) => {
  const [electionId, setElectionId] = useState(0);

  return (
    <VoteContext.Provider value={{ electionId, setElectionId }}>
      {children}
    </VoteContext.Provider>
  );
};
