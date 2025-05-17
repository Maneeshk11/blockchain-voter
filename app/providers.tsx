"use client";

import Nav from "@/components/nav";
import { getConfig } from "@/configs/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider, type State } from "wagmi";

export function Providers(props: {
  children: React.ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <Nav />
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
