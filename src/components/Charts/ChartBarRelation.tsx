"use client";

import PALETTE from "@/styles/_palette";
import { Box, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

import { Card } from "../Card/Card";

import { useFetchTopEconomicGroup } from "@/hooks";
import { chartbar_title, chartbarrelation_fonts, chartbarrelation_name } from "./styles";
import { ChartBarProps } from "./types";

export const ChartBarRelation = ({
  title,
  width,
  height,
  colors = ["#90CAF9", "#FFAB91", "#A5D6A7", "#FFCC80", "#CE93D8"]
}: ChartBarProps) => {
  const { topEconomicGroup } = useFetchTopEconomicGroup();

  const formattedData = topEconomicGroup.map((group) => ({
    name: group.name,
    relationsCount: group.relationsCount
  }));

  return (
    <Card>
      <Box sx={chartbar_title}>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          {title}
        </Typography>
      </Box>
      <Box width={width} height={height}>
        <ResponsiveBar
          data={formattedData}
          keys={["relationsCount"]}
          indexBy="name"
          margin={{ top: 10, right: 0, bottom: 15, left: 0 }}
          padding={0.2}
          layout="horizontal"
          colors={({ index }) => colors[index % colors.length]}
          axisBottom={{
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: 40,
            tickValues: []
          }}
          axisLeft={{
            tickRotation: 0,
            tickValues: [],
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
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        {topEconomicGroup.map((item, index) => (
          <Box key={item.name} sx={chartbarrelation_name}>
            <Box
              sx={{ ...chartbarrelation_fonts, backgroundColor: colors[index % colors.length] }}
            />
            <Typography variant="body2">
              {item.name.includes(" ")
                ? `${item.name.split(" ")[0]} ${item.name.split(" ").slice(-1)}`
                : item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};
