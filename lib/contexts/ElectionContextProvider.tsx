"use client";

import { createContext, useContext, useState } from "react";

interface ElectionContextType {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

export const ElectionContext = createContext<ElectionContextType | undefined>(
  undefined
);

export const useElectionContext = () => {
  const context = useContext(ElectionContext);
  if (!context) {
    throw new Error(
      "useElectionContext must be used within a ElectionContextProvider"
    );
  }
  return context;
};

interface ElectionContextProviderProps {
  children: React.ReactNode;
}

export const ElectionContextProvider = ({
  children,
}: ElectionContextProviderProps) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <ElectionContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </ElectionContext.Provider>
  );
};
