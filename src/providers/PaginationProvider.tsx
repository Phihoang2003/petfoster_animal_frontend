// components/PaginationProvider.tsx
"use client";

import { ToastProvider } from "@/providers";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/animations/PageTransition";
import React from "react";

interface PaginationProviderProps {
  children: React.ReactNode;
}

const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
}) => {
  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        <PageTransition>{children}</PageTransition>
      </AnimatePresence>
    </ToastProvider>
  );
};

export default PaginationProvider;
