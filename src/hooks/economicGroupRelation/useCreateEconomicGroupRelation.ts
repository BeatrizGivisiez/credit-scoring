"use client";
import { useState } from "react";

import {
  EconomicGroupRelationDTO,
  EconomicGroupRelationNewEntityDTO
} from "@/app/dto/EconomicGroupRelationDto";

export const useCreateEconomicGroupRelation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createEconomicGroupRelation = async (
    newRelation: EconomicGroupRelationDTO | EconomicGroupRelationNewEntityDTO
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/economicGroupRelation`, {
        method: "POST",
        headers: {
          accept: "text/plain"
        },
        body: JSON.stringify(newRelation)
      });

      if (!response.ok) {
        throw new Error(`Error creating data: ${response.statusText}`);
      }

      // Retorna os dados criados ou uma confirmação se necessário
      return await response.json();
    } catch (err: any) {
      // console.log("Error", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createEconomicGroupRelation, loading, error };
};
