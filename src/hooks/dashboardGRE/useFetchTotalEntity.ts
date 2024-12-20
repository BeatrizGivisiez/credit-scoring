"use client";
import { useEffect, useState } from "react";

export const useFetchTotalEntity = () => {
  const [totalEntity, setTotalEntity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalEntity = async () => {
      const cacheKey = "totalEntityCache";
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setTotalEntity(cachedData);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/totalEntity`, {
          method: "GET",
          headers: {
            accept: "application/ld+json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setTotalEntity(data);

        localStorage.setItem(cacheKey, data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalEntity();
  }, []);

  return { totalEntity, loading, error };
};
