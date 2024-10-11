"use client";
import { CharacteristicRelationDto } from "@/dto/characteristicRelationDto";
import { useEffect, useState } from "react";

const useFetchCharacteristicRelation = (page: number) => {
  const [characteristicRelation, setCharacteristicRelation] = useState<CharacteristicRelationDto[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacteristicRelation = async () => {
      try {
        const response = await fetch(`/api/characteristicRelation?page=${page}`, {
          method: "GET",
          headers: {
            accept: "application/ld+json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        // Acessa os dados dentro de data.member
        if (data.member) {
          setCharacteristicRelation(data.member); // Atualiza o estado
          console.log("Dados recebidos setCharacteristicRelation:", data.member); // Log para verificar a resposta
        } else {
          console.error("A propriedade 'member' não está definida na resposta.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacteristicRelation();
  }, [page]);

  return { characteristicRelation, loading, error };
};

export default useFetchCharacteristicRelation;
