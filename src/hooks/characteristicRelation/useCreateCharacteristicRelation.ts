"use client";
import { useState } from "react";

import { CreateCharacteristicRelationDTO } from "@/app/dto/CharacteristicRelationDto";

export const useCreateCharacteristicRelation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createCharacteristicRelation = async (newRelation: CreateCharacteristicRelationDTO) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/characteristicRelation`, {
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

      return await response.json();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createCharacteristicRelation, loading, error };
};
