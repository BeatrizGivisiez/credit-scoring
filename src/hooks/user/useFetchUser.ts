"use client";
import { useCallback, useEffect, useState } from "react";

import { UserDTO } from "@/app/dto/UserDto";

export const useFetchUser = () => {
  const [user, setUser] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user`, {
        method: "GET",
        headers: {
          accept: "application/ld+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data: UserDTO[] = await response.json();
      setUser(data);
      console.log("Dados recebidos setUser:", data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Depende de nenhum valor externo

  // Chama fetchUser na inicialização
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch: fetchUser };
};
