"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const client = new QueryClient();

type ReactQueryProviderProps = {
  children: ReactNode;
};

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
