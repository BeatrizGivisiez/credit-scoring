"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { UserDTO } from "@/app/dto/UserDto";

export const useFetchPerfil = () => {
  const perfilRef = useRef<UserDTO[]>([]); // Armazena os perfis em memória
  const [perfil, setPerfil] = useState<UserDTO[]>([]); // Estado reativo para renderização
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerfil = useCallback(async () => {
    setLoading(true);

    try {
      // Se o `perfilRef` já contém dados, usa-os para evitar nova chamada
      if (perfilRef.current.length > 0) {
        setPerfil(perfilRef.current);
        setLoading(false);
        return;
      }

      // Faz a chamada à API se os dados não estiverem no `useRef`
      const response = await fetch(`/api/perfil`, {
        method: "GET",
        headers: {
          accept: "application/ld+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data: UserDTO[] = await response.json();

      // Atualiza o `useRef` e o estado reativo
      perfilRef.current = data;
      setPerfil(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Força uma atualização manual do perfil e reseta o `useRef`
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/perfil`, {
        method: "GET",
        headers: {
          accept: "application/ld+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data: UserDTO[] = await response.json();

      // Atualiza o `useRef` e o estado reativo
      perfilRef.current = data;
      setPerfil(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Chama fetchPerfil na inicialização
  useEffect(() => {
    fetchPerfil();
  }, [fetchPerfil]);

  return { perfil, loading, error, refetch };
};
