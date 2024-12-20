"use client";
import { useEffect, useState } from "react";
import { TopEconomicGroupDTO } from "@/app/dto/TopEconomicGroupDto";

export const useFetchTopEconomicGroup = () => {
  const [topEconomicGroup, setTopEconomicGroup] = useState<TopEconomicGroupDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopEconomicGroup = async () => {
      try {
        const response = await fetch(`/api/topEconomicGroup`, {
          method: "GET",
          headers: {
            accept: "application/ld+json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: TopEconomicGroupDTO[] = await response.json();
        const sortedData = data.sort((a, b) => a.relationsCount - b.relationsCount);
        setTopEconomicGroup(sortedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopEconomicGroup();
  }, []);

  return { topEconomicGroup, loading, error };
};
