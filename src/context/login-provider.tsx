// context/LoginDialogContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LoginDialogContextType = {
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  isLoginDialogOpen: boolean;
};

const LoginDialogContext = createContext<LoginDialogContextType | undefined>(
  undefined
);

export const LoginDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const openLoginDialog = () => setIsLoginDialogOpen(true);
  const closeLoginDialog = () => setIsLoginDialogOpen(false);

  return (
    <LoginDialogContext.Provider
      value={{ openLoginDialog, closeLoginDialog, isLoginDialogOpen }}
    >
      {children}
    </LoginDialogContext.Provider>
  );
};

export const useLoginDialog = () => {
  const context = useContext(LoginDialogContext);
  if (!context) {
    throw new Error("useLoginDialog must be used within a LoginDialogProvider");
  }
  return context;
};
