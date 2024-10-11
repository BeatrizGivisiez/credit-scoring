"use client";
import { useState } from "react";
import { EconomicGroupCreateDto } from "@/dto/economicGroupDto";

const useCreateCharacteristicRelation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createCharacteristicRelation = async (newRelation: EconomicGroupCreateDto) => {
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

  return { createCharacteristicRelation, loading, error };
};

export default useCreateCharacteristicRelation;
