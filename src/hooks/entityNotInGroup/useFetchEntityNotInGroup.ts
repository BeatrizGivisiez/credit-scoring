"use client";
import { useEffect, useState } from "react";

import { EntityNotInGroupDTO } from "@/app/dto/EntityNotInGroupDto";

export const useFetchEntityNotInGroup = () => {
  const [entityNotInGroup, setEntityNotInGroup] = useState<EntityNotInGroupDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntityNotInGroup = async () => {
      try {
        const response = await fetch(`/api/entityNotInGroup`, {
          method: "GET",
          headers: {
            accept: "application/ld+json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: EntityNotInGroupDTO[] = await response.json(); // API retorna um array
        setEntityNotInGroup(data); // Atualiza o estado com as entidades recebidas
        console.log("Dados recebidos setEntityNotInGroup:", data); // Log para verificar a resposta
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntityNotInGroup();
  }, []);

  return { entityNotInGroup, loading, error };
};
