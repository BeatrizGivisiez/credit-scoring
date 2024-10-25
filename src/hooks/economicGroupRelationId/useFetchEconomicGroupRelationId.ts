"use client";
import { useState } from "react";

import { EconomicGroupId } from "@/app/dto/EconomicGroupIdDto";

export const useFetchEconomicGroupRelationId = () => {
  const [economicGroupRelationId, setEconomicGroupRelationId] = useState<EconomicGroupId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEconomicGroupRelationId = async (id: string) => {
    try {
      const response = await fetch(`/api/economicGroupRelationId?id=${id}`, {
        method: "GET",
        headers: {
          accept: "application/ld+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data: EconomicGroupId[] = await response.json(); // API retorna um array
      setEconomicGroupRelationId(data);
      // console.log("Dados recebidos setEconomicGroupRelation:", data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { economicGroupRelationId, fetchEconomicGroupRelationId, loading, error };
};
