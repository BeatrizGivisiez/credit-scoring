"use client";

import { useEffect, useState, useCallback } from "react";
import { CharacteristicRelationDTO } from "@/app/dto/CharacteristicRelationDto";

export const useFetchCharacteristicRelation = () => {
  const [characteristicRelation, setCharacteristicRelation] = useState<CharacteristicRelationDTO[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define a função de busca com useCallback para evitar recriação em cada renderização
  const fetchCharacteristicRelation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/characteristicRelation`, {
        method: "GET",
        headers: {
          accept: "application/ld+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data: CharacteristicRelationDTO[] = await response.json();
      setCharacteristicRelation(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacteristicRelation();
  }, [fetchCharacteristicRelation]);

  return { characteristicRelation, loading, error, fetchCharacteristicRelation };
};
