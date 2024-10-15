"use client";
import { useEffect, useState } from "react";

import { CharacteristicRelationDTO } from "@/app/dto/CharacteristicRelationDto";

export const useFetchCharacteristicRelation = () => {
  const [characteristicRelation, setCharacteristicRelation] = useState<CharacteristicRelationDTO[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacteristicRelation = async () => {
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

        const data: CharacteristicRelationDTO[] = await response.json(); // API retorna um array
        setCharacteristicRelation(data);
        console.log("Dados recebidos setCharacteristicRelation:", data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacteristicRelation();
  }, []);

  return { characteristicRelation, loading, error };
};
