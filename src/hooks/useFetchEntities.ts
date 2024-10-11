"use client";
import { useEffect, useState } from "react";

import { EntitiesDto } from "@/dto/entitiesDto";

const useFetchEntities = (page: number) => {
  const [entities, setEntities] = useState<EntitiesDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch(`/api/entities?page=${page}`, {
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
          setEntities(data.member); // Atualiza o estado com as entidades
          console.log("Dados recebidos setEntities:", data.member); // Log para verificar a resposta
        } else {
          console.error("A propriedade 'member' não está definida na resposta.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, [page]);

  return { entities, loading, error };
};

export default useFetchEntities;
