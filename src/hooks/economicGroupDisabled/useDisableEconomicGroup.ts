import { useState } from "react";

interface UseDisableEconomicGroupResult {
  disableGroup: (id: string, date: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useDisableEconomicGroup = (): UseDisableEconomicGroupResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const disableGroup = async (id: string, date: string) => {
    setLoading(true);
    setError(null);

    try {
      // Envia a requisição para o endpoint de desativação com id e data
      const response = await fetch(`/api/economicGroupDisabled?id=${id}&date=${date}`, {
        method: "POST",
        headers: {
          accept: "text/plain" // O Swagger mostra que aceita "text/plain"
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao desativar o grupo: ${response.statusText}`);
      }

      await response.text();
    } catch (err: any) {
      console.error("Erro ao desativar o grupo:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { disableGroup, loading, error };
};
