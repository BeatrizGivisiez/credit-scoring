"use client";
import { createContext, ReactNode, useContext } from "react";
import { EconomicGroupDTO } from "@/app/dto/EconomicGroupDto";
import { useFetchEconomicGroup } from "@/hooks";

// Definir o formato do contexto
interface EconomicGroupContextType {
  economicGroup: EconomicGroupDTO[];
  loading: boolean;
  error: string | null;
  fetchEconomicGroup: () => void; // Nova função para buscar os dados
}

// Criar o contexto com valor padrão
const EconomicGroupContext = createContext<EconomicGroupContextType | undefined>(undefined);

// Criar o Provider
export const EconomicGroupProvider = ({ children }: { children: ReactNode }) => {
  const { economicGroup, loading, error, fetchEconomicGroup } = useFetchEconomicGroup(); // Usa o hook customizado para buscar as entidades

  return (
    <EconomicGroupContext.Provider
      value={{
        economicGroup: economicGroup,
        loading,
        error,
        fetchEconomicGroup: fetchEconomicGroup
      }}
    >
      {children}
    </EconomicGroupContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useEconomicGroup = () => {
  const context = useContext(EconomicGroupContext);
  if (!context) {
    throw new Error("useEconomicGroup deve ser usado dentro de EconomicGroupProvider");
  }
  return context;
};
