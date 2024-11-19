"use client";
import { useEffect, useState, useCallback } from "react";
import { EconomicGroupDTO } from "@/app/dto/EconomicGroupDto";

export const useFetchEconomicGroup = () => {
  const [economicGroup, setEconomicGroup] = useState<EconomicGroupDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEconomicGroup = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/economicGroup`, {
        method: "GET",
        headers: {
          accept: "application/ld+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data: EconomicGroupDTO[] = await response.json();
      setEconomicGroup(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEconomicGroup();
  }, [fetchEconomicGroup]);

  return { economicGroup, loading, error, fetchEconomicGroup };
};
