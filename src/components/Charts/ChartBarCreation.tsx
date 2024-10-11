"use client";
import React from "react";

import { DATACHARTBAR } from "@/app/_mocks/datachartbar";
import PALETTE from "@/styles/_palette";
import { Box, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

import { Card } from "../Card/Card";
import { ChartBarProps } from "./types";

const groupByTrimestre = (data: any) => {
  const trimestres = {
    "1 Trimestre": new Set(),
    "2 Trimestre": new Set(),
    "3 Trimestre": new Set(),
    "4 Trimestre": new Set()
  };

  // Conta grupos únicos de acordo com o trimestre
  data.forEach((item: any) => {
    const month = new Date(item.dataCriacao).getMonth(); // 0-11 (Janeiro = 0)
    const grupo = item.grupo;

    if (month >= 0 && month < 3) {
      trimestres["1 Trimestre"].add(grupo); // Adiciona o grupo ao conjunto do 1T
    } else if (month >= 3 && month < 6) {
      trimestres["2 Trimestre"].add(grupo); // Adiciona o grupo ao conjunto do 2T
    } else if (month >= 6 && month < 9) {
      trimestres["3 Trimestre"].add(grupo); // Adiciona o grupo ao conjunto do 3T
    } else if (month >= 9 && month < 12) {
      trimestres["4 Trimestre"].add(grupo); // Adiciona o grupo ao conjunto do 4T
    }
  });

  // Retorna a contagem de grupos únicos por trimestre
  return [
    { trimestre: "1 Trimestre", quantidade: trimestres["1 Trimestre"].size }, // Conta o tamanho do conjunto
    { trimestre: "2 Trimestre", quantidade: trimestres["2 Trimestre"].size },
    { trimestre: "3 Trimestre", quantidade: trimestres["3 Trimestre"].size },
    { trimestre: "4 Trimestre", quantidade: trimestres["4 Trimestre"].size }
  ];
};

const groupedData = groupByTrimestre(DATACHARTBAR);

export const ChartBarCreation = ({
  title,
  width,
  height,
  colors = ["#90CAF9", "#FFAB91", "#A5D6A7", "#FFCC80", "#CE93D8"]
}: ChartBarProps) => (
  <Card
    sx={{
      display: "flex !important",
      backgroundColor: "red",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
        {title}
      </Typography>
    </Box>
    <Box width={width} height={height}>
      <ResponsiveBar
        data={groupedData}
        keys={["quantidade"]}
        indexBy="trimestre" // A chave para o eixo X
        margin={{ top: 50, right: 30, bottom: 25, left: 50 }}
        padding={0.3}
        layout="vertical"
        colors={({ index }) => colors[index % colors.length]}
        axisBottom={{
          tickRotation: 0,
          // tickValues: [],
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
        enableGridX={false} // Adicione esta linha
        enableGridY={false} // E esta linha
      />
    </Box>
  </Card>
);
