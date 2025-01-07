"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type AuthContextType = {
  perfilId: number | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [perfilId, setPerfilId] = useState<number | null>(null);

  useEffect(() => {
    if (session?.user?.perfilId) {
      setPerfilId(session.user.perfilId);
    }
  }, [session]);

  return <AuthContext.Provider value={{ perfilId }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
