"use client";

import { useEffect, useState } from "react";

import PALETTE from "@/styles/_palette";
import { Box, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

import { useFetchTopEconomicGroup } from "@/hooks";
import { Card } from "../Card/Card";
import { chartbar_title, chartbarcreation_card } from "./styles";
import { ChartBarProps } from "./types";

const groupByTrimestre = (data: any) => {
  const trimestres = {
    "1º Trimestre": new Set(),
    "2º Trimestre": new Set(),
    "3º Trimestre": new Set(),
    "4º Trimestre": new Set()
  };
  data.forEach((item: any) => {
    const month = new Date(item.created).getMonth();
    const grupo = item.name;
    if (month >= 0 && month < 3) {
      trimestres["1º Trimestre"].add(grupo);
    } else if (month >= 3 && month < 6) {
      trimestres["2º Trimestre"].add(grupo);
    } else if (month >= 6 && month < 9) {
      trimestres["3º Trimestre"].add(grupo);
    } else if (month >= 9 && month < 12) {
      trimestres["4º Trimestre"].add(grupo);
    }
  });
  return [
    { trimestre: "1º Trimestre", quantidade: trimestres["1º Trimestre"].size },
    { trimestre: "2º Trimestre", quantidade: trimestres["2º Trimestre"].size },
    { trimestre: "3º Trimestre", quantidade: trimestres["3º Trimestre"].size },
    { trimestre: "4º Trimestre", quantidade: trimestres["4º Trimestre"].size }
  ];
};

export const ChartBarCreation = ({
  title,
  width,
  height,
  colors = ["#90CAF9", "#FFAB91", "#A5D6A7", "#FFCC80", "#CE93D8"]
}: ChartBarProps) => {
  const { topEconomicGroup } = useFetchTopEconomicGroup();
  const [groupedData, setGroupedData] = useState<Array<{ trimestre: string; quantidade: number }>>(
    []
  );

  useEffect(() => {
    if (topEconomicGroup.length > 0) {
      const formattedData = groupByTrimestre(topEconomicGroup);
      setGroupedData(formattedData);
    }
  }, [topEconomicGroup]);
  return (
    <Card sx={chartbarcreation_card}>
      <Box sx={chartbar_title}>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          {title}
        </Typography>
      </Box>
      <Box width={width} height={height}>
        <ResponsiveBar
          data={groupedData}
          keys={["quantidade"]}
          indexBy="trimestre"
          margin={{ top: 50, right: 30, bottom: 25, left: 50 }}
          padding={0.3}
          layout="vertical"
          colors={({ index }) => colors[index % colors.length]}
          axisBottom={{
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: 40,
            legend: "Período"
          }}
          axisLeft={{
            tickRotation: 0,
            legend: "Quantidade de Grupos",
            legendPosition: "middle",
            legendOffset: -40
          }}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]]
          }}
          enableGridX={false}
          enableGridY={false}
        />
      </Box>
    </Card>
  );
};
