// app/context/EntityContext.tsx
"use client";

import { createContext, ReactNode, useContext } from "react";

import { CharacteristicRelationDTO } from "@/dto/CharacteristicRelationDto";
import { useFetchCharacteristicRelation } from "@/hooks";

// Definir o formato do contexto
interface CharacteristicRelationContextType {
  characteristicRelation: CharacteristicRelationDTO[];
  loading: boolean;
  error: string | null;
}

// Criar o contexto com valor padrão
const CharacteristicRelationContext = createContext<CharacteristicRelationContextType | undefined>(
  undefined
);

// Criar o Provider
export const EntityProvider = ({ children }: { children: ReactNode }) => {
  const { characteristicRelation, loading, error } = useFetchCharacteristicRelation(); // Usa o hook customizado para buscar as entidades

  return (
    <CharacteristicRelationContext.Provider value={{ characteristicRelation, loading, error }}>
      {children}
    </CharacteristicRelationContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useEntity = () => {
  const context = useContext(CharacteristicRelationContext);
  if (!context) {
    throw new Error(
      "useCharacteristicRelation deve ser usado dentro de CharacteristicRelationProvider"
    );
  }
  return context;
};
