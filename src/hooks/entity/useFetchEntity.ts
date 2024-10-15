//src/hooks/entity/useFetchEntity.ts
"use client";
import { useEffect, useState } from "react";

import { EntityDTO } from "@/app/dto/EntityDto";

export const useFetchEntity = () => {
  const [entity, setEntity] = useState<EntityDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await fetch(`/api/entity`, {
          method: "GET",
          headers: {
            accept: "application/ld+json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: EntityDTO[] = await response.json(); // API retorna um array
        setEntity(data); // Atualiza o estado com as entidades recebidas
        console.log("Dados recebidos setEntity:", data); // Log para verificar a resposta
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntity();
  }, []);

  return { entity, loading, error };
};
