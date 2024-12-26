"use client";
import { useCallback, useEffect, useState } from "react";

import { EntityNotInGroupDTO } from "@/app/dto/EntityNotInGroupDto";

export const useFetchNotInGroupEntity = () => {
  const [notInGroupEntity, setNotInGroupEntity] = useState<EntityNotInGroupDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotInGroupEntity = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/notInGroupEntity`, {
        method: "GET",
        headers: {
          accept: "application/ld+json",
          "Cache-Control": "no-cache"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data: EntityNotInGroupDTO[] = await response.json();
      setNotInGroupEntity(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotInGroupEntity();
  }, [fetchNotInGroupEntity]);

  return { notInGroupEntity, loading, error, refetch: fetchNotInGroupEntity };
};
