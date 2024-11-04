import { useState } from "react";

interface UseDisableRelationResult {
  disableCharacteristicRelation: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useDisableRelation = (): UseDisableRelationResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const disableCharacteristicRelation = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      // Envia a requisição para o endpoint de desativação com id e data
      const response = await fetch(`/api/characteristicRelationDisabled?id=${id}`, {
        method: "POST",
        headers: {
          accept: "text/plain" // O Swagger mostra que aceita "text/plain"
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao inativar a Relação: ${response.statusText}`);
      }

      await response.text();
    } catch (err: any) {
      console.error("Erro ao desativar o grupo:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { disableCharacteristicRelation, loading, error };
};
