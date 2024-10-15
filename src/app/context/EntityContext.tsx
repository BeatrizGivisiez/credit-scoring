// app/context/EntityContext.tsx
"use client";

import { createContext, ReactNode, useContext } from "react";

import { EntityDTO } from "@/app/dto/EntityDto";
import { useFetchEntity } from "@/hooks";

// Definir o formato do contexto
interface EntityContextType {
  entity: EntityDTO[];
  loading: boolean;
  error: string | null;
}

// Criar o contexto com valor padrão
const EntityContext = createContext<EntityContextType | undefined>(undefined);

// Criar o Provider
export const EntityProvider = ({ children }: { children: ReactNode }) => {
  const { entity, loading, error } = useFetchEntity(); // Usa o hook customizado para buscar as entidades

  return (
    <EntityContext.Provider value={{ entity: entity, loading, error }}>
      {children}
    </EntityContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useEntity = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error("useEntity deve ser usado dentro de EntityProvider");
  }
  return context;
};
