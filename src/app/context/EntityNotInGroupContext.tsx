"use client";

import { createContext, ReactNode, useContext } from "react";

import { EntityDTO } from "@/app/dto/EntityDto";
import { useFetchEntityNotInGroup } from "@/hooks";

// Definir o formato do contexto
interface EntityContextType {
  entityNotInGroup: EntityDTO[];
  loading: boolean;
  error: string | null;
}

// Criar o contexto com valor padrão
const EntityNotInGroupContext = createContext<EntityContextType | undefined>(undefined);

// Criar o Provider
export const EntityNotInGroupProvider = ({ children }: { children: ReactNode }) => {
  const { entityNotInGroup, loading, error } = useFetchEntityNotInGroup(); // Usa o hook customizado para buscar as entidades

  return (
    <EntityNotInGroupContext.Provider value={{ entityNotInGroup, loading, error }}>
      {children}
    </EntityNotInGroupContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const EntityNotInGroup = () => {
  const context = useContext(EntityNotInGroupContext);
  if (!context) {
    throw new Error("EntityNotInGroup deve ser usado dentro de EntityProvider");
  }
  return context;
};
