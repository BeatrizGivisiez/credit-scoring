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
      const response = await fetch(`/api/economicGroupDisabled/?id=${id}&date=${date}`, {
        method: "POST",
        headers: {
          accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao desativar o grupo: ${response.statusText}`);
      }

      // A API está retornando um valor booleano 'true' como corpo da resposta
      const data = await response.json();
      console.log("Grupo desativado com sucesso:", data); // Mostra 'true' no console
    } catch (err: any) {
      console.error("Erro ao desativar o grupo:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { disableGroup, loading, error };
};
