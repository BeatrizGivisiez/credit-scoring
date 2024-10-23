"use client";
import { useEffect, useState } from "react";

import { EconomicGroupRelationDTO } from "@/app/dto/EconomicGroupRelationDto";

export const useFetchEconomicGroupRelation = () => {
  const [economicGroupRelation, setEconomicGroupRelation] = useState<EconomicGroupRelationDTO[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEconomicGroupRelation = async () => {
      try {
        const response = await fetch(`/api/economicGroupRelation?page`, {
          method: "GET",
          headers: {
            accept: "application/ld+json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: EconomicGroupRelationDTO[] = await response.json(); // API retorna um array
        setEconomicGroupRelation(data);
        // console.log("Dados recebidos setEconomicGroupRelation:", data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEconomicGroupRelation();
  }, []);

  return { economicGroupRelation, loading, error };
};
