"use client";
import { useState } from "react";

import { EconomicGroupDTO } from "@/dto/EconomicGroupDto";

export const useCreateEconomicGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createEconomicGroup = async (newRelation: EconomicGroupDTO) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/economicGroup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/ld+json"
        },
        body: JSON.stringify(newRelation)
      });

      if (!response.ok) {
        throw new Error(`Error creating data: ${response.statusText}`);
      }

      // Retorna os dados criados ou uma confirmação se necessário
      return await response.json();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createEconomicGroup, loading, error };
};
