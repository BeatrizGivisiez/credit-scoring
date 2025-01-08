"use client";
import { createContext, useContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/next-auth";

type AuthContextType = {
  perfilId: number | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession() as { data: CustomSession };
  const perfilId = session?.user?.perfilId || null;

  return <AuthContext.Provider value={{ perfilId }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
