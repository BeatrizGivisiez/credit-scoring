"use client";
import { useState } from "react";

import { EconomicGroupId } from "@/app/dto/EconomicGroupIdDto";

export const useFetchTreeChartsId = () => {
  const [treeChartsId, setTreeChartsId] = useState<EconomicGroupId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTreeChartsId = async (id: string) => {
    try {
      const response = await fetch(`/api/treeCharts?id=${id}`, {
        method: "GET",
        headers: {
          accept: "application/ld+json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data: EconomicGroupId[] = await response.json();
      setTreeChartsId(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { treeChartsId, fetchTreeChartsId, loading, error };
};
