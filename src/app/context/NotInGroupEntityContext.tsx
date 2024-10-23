"use client";

import { createContext, ReactNode, useContext } from "react";
import { EntityNotInGroupDTO } from "@/app/dto/EntityNotInGroupDto";
import { useFetchNotInGroupEntity } from "@/hooks";

// Definir o formato do contexto, incluindo a função de recarregar
interface EntityContextType {
  notInGroupEntity: EntityNotInGroupDTO[];
  loading: boolean;
  error: string | null;
  refetch: () => void; // Inclui a função refetch no contexto
}

// Criar o contexto com valor padrão como undefined
const NotInGroupEntityContext = createContext<EntityContextType | undefined>(undefined);

// Criar o Provider para fornecer o contexto
export const NotInGroupEntityProvider = ({ children }: { children: ReactNode }) => {
  const {
    notInGroupEntity,
    loading,
    error,
    refetch: fetchNotInGroupEntity // Renomeando refetch para fetchNotInGroupEntity para maior clareza
  } = useFetchNotInGroupEntity(); // Usa o hook customizado para buscar as entidades

  return (
    <NotInGroupEntityContext.Provider
      value={{ notInGroupEntity, loading, error, refetch: fetchNotInGroupEntity }}
    >
      {children}
    </NotInGroupEntityContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useNotInGroupEntity = () => {
  const context = useContext(NotInGroupEntityContext);
  if (!context) {
    throw new Error("useNotInGroupEntity deve ser usado dentro de NotInGroupEntityProvider");
  }
  return context;
};
