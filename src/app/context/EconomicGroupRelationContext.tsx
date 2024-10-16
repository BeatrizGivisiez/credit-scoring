"use client";

import { createContext, ReactNode, useContext } from "react";

import { EconomicGroupRelationDTO } from "@/app/dto/EconomicGroupRelationDto";
import { useFetchEconomicGroupRelation } from "@/hooks";

// Definir o formato do contexto
interface EconomicGroupRelationContextType {
  economicGroupRelation: EconomicGroupRelationDTO[];
  loading: boolean;
  error: string | null;
}

// Criar o contexto com valor padrão
const EconomicGroupRelationContext = createContext<EconomicGroupRelationContextType | undefined>(
  undefined
);

// Criar o Provider
export const EconomicGroupRelationProvider = ({ children }: { children: ReactNode }) => {
  const { economicGroupRelation, loading, error } = useFetchEconomicGroupRelation(); // Usa o hook customizado para buscar as entidades

  return (
    <EconomicGroupRelationContext.Provider
      value={{ economicGroupRelation: economicGroupRelation, loading, error }}
    >
      {children}
    </EconomicGroupRelationContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useEconomicGroupRelation = () => {
  const context = useContext(EconomicGroupRelationContext);
  if (!context) {
    throw new Error(
      "useEconomicGroupRelation deve ser usado dentro de EconomicGroupRelationProvider"
    );
  }
  return context;
};
