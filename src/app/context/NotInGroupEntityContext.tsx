"use client";

import { createContext, ReactNode, useContext } from "react";
import { EntityNotInGroupDTO } from "@/app/dto/EntityNotInGroupDto";
import { useFetchNotInGroupEntity } from "@/hooks";

interface EntityContextType {
  notInGroupEntity: EntityNotInGroupDTO[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const NotInGroupEntityContext = createContext<EntityContextType | undefined>(undefined);

export const NotInGroupEntityProvider = ({ children }: { children: ReactNode }) => {
  const {
    notInGroupEntity,
    loading,
    error,
    refetch: fetchNotInGroupEntity
  } = useFetchNotInGroupEntity();

  return (
    <NotInGroupEntityContext.Provider
      value={{ notInGroupEntity, loading, error, refetch: fetchNotInGroupEntity }}
    >
      {children}
    </NotInGroupEntityContext.Provider>
  );
};

export const useNotInGroupEntity = () => {
  const context = useContext(NotInGroupEntityContext);
  if (!context) {
    throw new Error("useNotInGroupEntity deve ser usado dentro de NotInGroupEntityProvider");
  }
  return context;
};
