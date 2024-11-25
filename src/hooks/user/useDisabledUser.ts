import { useState } from "react";

interface UseDisabledUserResult {
  disabledUser: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useDisabledUser = (): UseDisabledUserResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const disabledUser = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      // Envia a requisição para o endpoint de desativação com id e data
      const response = await fetch(`/api/userDisabled?id=${id}`, {
        method: "POST",
        headers: {
          accept: "text/plain" // O Swagger mostra que aceita "text/plain"
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao inativar a Utilizador: ${response.statusText}`);
      }

      await response.text();
    } catch (err: any) {
      console.error("Erro ao desativar o Utilizador:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { disabledUser, loading, error };
};
