"use client";
import { useEffect, useState } from "react";

export const useFetchTotalEconomicGroup = () => {
  const [totalEconomicGroup, setTotalEconomicGroup] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalEconomicGroup = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/totalEconomicGroup`, {
          method: "GET",
          headers: {
            accept: "application/ld+json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: string = await response.json();
        setTotalEconomicGroup(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalEconomicGroup();
  }, []);

  return { totalEconomicGroup, loading, error };
};
