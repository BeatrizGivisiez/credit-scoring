"use client";
import React from "react";

import { DATACHARTBAR } from "@/app/_mocks/datachartbar";
import PALETTE from "@/styles/_palette";
import { Box, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

import { Card } from "../Card/Card";
import { ChartBarProps } from "./types";

export const sortedData = DATACHARTBAR.sort((a, b) => a.quantidade - b.quantidade);

export const ChartBarRelation = ({
  title,
  width,
  height,
  colors = ["#90CAF9", "#FFAB91", "#A5D6A7", "#FFCC80", "#CE93D8"]
}: ChartBarProps) => (
  <Card>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
        {title}
      </Typography>
    </Box>
    <Box width={width} height={height}>
      <ResponsiveBar
        data={sortedData}
        keys={["quantidade"]}
        indexBy="grupo"
        margin={{ top: 10, right: 0, bottom: 15, left: 0 }} // Ajuste a margem se necessário
        padding={0.2}
        layout="horizontal" // Altere para horizontal
        colors={({ index }) => colors[index % colors.length]}
        axisBottom={{
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: 40,
          tickValues: []
          // legend: "Quantidade", // Eixo inferior agora representa a quantidade
        }}
        axisLeft={{
          tickRotation: 0,
          tickValues: [],
          legendPosition: "middle",
          legendOffset: -40
          // legend: "Grupos", // Nome dos grupos na lateral esquerda
        }}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]]
        }}
        enableGridX={false} // Remover linhas de grade
        enableGridY={false} // Remover linhas de grade
      />
    </Box>
    <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
      {sortedData.map((item, index) => (
        <Box
          key={item.grupo}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "25%"
          }}
        >
          <Box
            sx={{
              width: "10px",
              height: "10px",
              backgroundColor: colors[index % colors.length],
              marginRight: 1
            }}
          />
          <Typography variant="body2">
            {" "}
            {`${item.grupo.split(" ")[0]} ${item.grupo.split(" ").slice(-1)}`}
          </Typography>
        </Box>
      ))}
    </Box>
  </Card>
);
