"use client";
import { useEffect, useState } from "react";

export const useFetchTotalEntity = () => {
  const [totalEntity, setTotalEntity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalEntity = async () => {
      try {
        const response = await fetch(`/api/totalEntity`, {
          method: "GET",
          headers: {
            accept: "application/ld+json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: string = await response.json(); // API retorna um array
        setTotalEntity(data); // Atualiza o estado com as entidades recebidas
        console.log("Dados recebidos setTotalEntity:", data); // Log para verificar a resposta
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalEntity();
  }, []);

  return { totalEntity, loading, error };
};
