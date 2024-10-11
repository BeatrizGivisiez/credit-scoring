"use client";
import { useState } from "react";

import { EconomicGroupDto } from "@/dto/economicGroupDto";

const useFetchEconomicGroup = () => {
  const [economicGroup, setEconomicGroup] = useState<EconomicGroupDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItens, setTotalItens] = useState<number>(0);

  const fetchEconomicGroup = async (page: number, itemsPerPage: number) => {
    try {
      const response = await fetch(`/api/economicGroup?page=${page}&itemsPerPage=${itemsPerPage}`, {
        method: "GET",
        headers: {
          accept: "application/ld+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      // Acessa os dados dentro de data.member
      if (data.member) {
        setEconomicGroup(data.member); // Atualiza o estado
        setTotalItens(data.totalItems);
        console.log("Dados recebidos setEconomicGroup:", data.member); // Log para verificar a resposta
      } else {
        console.error("A propriedade 'member' não está definida na resposta.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchEconomicGroup, economicGroup, loading, error, totalItens };
};

export default useFetchEconomicGroup;
