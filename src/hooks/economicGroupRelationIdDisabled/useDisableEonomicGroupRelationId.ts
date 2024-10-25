import { useState } from "react";

interface UseDisableEconomicGroupResult {
  disableRelationGroupId: (id: string, date: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useDisableEconomicGroupRelationId = (): UseDisableEconomicGroupResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const disableRelationGroupId = async (id: string, date: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/economicGroupDisabled?id=${id}&date=${date}`, {
        method: "POST",
        headers: {
          accept: "text/plain" // O Swagger mostra que aceita "text/plain"
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao desativar o grupo: ${response.statusText}`);
      }

      // Não é necessário ler a resposta se o valor não será usado
      await response.text();
    } catch (err: any) {
      console.error("Erro ao desativar o grupo:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { disableRelationGroupId, loading, error };
};
