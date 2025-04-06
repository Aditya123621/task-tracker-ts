"use client";
import { ReduxProvider } from "@/store/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import ApplicationLayout from "./ApplicationLayout";
import { ReactNode } from "react";

interface ChildrenWrapperProps {
  children: ReactNode;
}

export const ClientWrapper = ({ children }: ChildrenWrapperProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <ApplicationLayout>{children}</ApplicationLayout>
      </QueryClientProvider>
    </ReduxProvider>
  );
};
