// app/context/EntityContext.tsx
"use client"; // Isso permite que o componente seja renderizado no cliente

import { createContext, useContext, ReactNode } from "react";
import useFetchEntities from "@/hooks/entity/useFetchEntity"; // Importa o hook customizado
import { EntityDTO } from "@/dto/EntityDto";

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
  const { entity, loading, error } = useFetchEntities(); // Usa o hook customizado para buscar as entidades

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
