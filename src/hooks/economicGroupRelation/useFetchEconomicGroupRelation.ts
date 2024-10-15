"use client";
import { useEffect, useState } from "react";

import { EconomicGroupRelationDTO } from "@/app/dto/EconomicGroupRelationDto";

const useFetchEconomicGroupRelation = (page: number) => {
  const [economicGroupRelation, setEconomicGroupRelation] = useState<EconomicGroupRelationDTO[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEconomicGroupRelation = async () => {
      try {
        const response = await fetch(`/api/economicGroupRelation?page=${page}`, {
          method: "GET",
          headers: {
            accept: "application/ld+json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.member) {
          setEconomicGroupRelation(data.member); // Atualiza o estado
          console.log("Dados recebidos setEconomicGroupRelation:", data.member); // Log para verificar a resposta
        } else {
          console.error("A propriedade 'member' não está definida na resposta.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEconomicGroupRelation();
  }, [page]);

  return { economicGroupRelation, loading, error };
};

export default useFetchEconomicGroupRelation;
