"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";

import { CharacteristicRelationDTO } from "@/app/dto/CharacteristicRelationDto";
import { useFetchCharacteristicRelation } from "@/hooks";

interface CharacteristicRelationContextType {
  characteristicRelation: CharacteristicRelationDTO[];
  characteristicRelationActive: CharacteristicRelationDTO[];
  loading: boolean;
  error: string | null;
}

// Criar o contexto com valor padrão
const CharacteristicRelationContext = createContext<CharacteristicRelationContextType | undefined>(
  undefined
);

// Criar o Provider
export const CharacteristicRelationProvider = ({ children }: { children: ReactNode }) => {
  const { characteristicRelation, loading, error } = useFetchCharacteristicRelation(); // Usa o hook customizado para buscar as entidades

  const characteristicRelationActive = useMemo(
    () => characteristicRelation.filter((i) => i.status === true),
    [characteristicRelation]
  );

  return (
    <CharacteristicRelationContext.Provider
      value={{ characteristicRelation, characteristicRelationActive, loading, error }}
    >
      {children}
    </CharacteristicRelationContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useCharacteristicRelation = () => {
  const context = useContext(CharacteristicRelationContext);

  if (!context) {
    throw new Error(
      "useCharacteristicRelation deve ser usado dentro de CharacteristicRelationProvider"
    );
  }
  return context;
};
