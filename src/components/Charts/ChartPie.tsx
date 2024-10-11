"use client";
// @typescript-eslint/no-unused-vars
// import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useState } from "react";

// import { ChartPieProps, SegmentType } from "./types";

import { dataOptions } from "@/app/_mocks/datachartpi";
import { Card } from "@/components";
import PALETTE from "@/styles/_palette";

import { Box, Select, MenuItem, FormControl, InputLabel, Typography } from "@mui/material";
import { ChartPieProps, SegmentType } from "./types";
// import { dataOptions } from "@/constants/datachartpi";

export const ChartPie = ({ width, height, title }: ChartPieProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState<SegmentType>("clientes");
  const handleChange = (event: any) => {
    setSelectedCategory(event.target.value as SegmentType);
  };

  return (
    <Card>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          {title}
        </Typography>
        <FormControl>
          <InputLabel id="select-category-label">Tipo</InputLabel>
          <Select
            labelId="select-category-label"
            value={selectedCategory}
            label="Tipo"
            onChange={handleChange}
          >
            <MenuItem value="clientes">Clientes</MenuItem>
            <MenuItem value="outroSegmento">Outro Segmento</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box width={width} height={height}>
        <ResponsivePie
          arcLinkLabelsStraightLength={5}
          data={dataOptions[selectedCategory]}
          margin={{ top: 10, right: 80, bottom: 60, left: 80 }}
          innerRadius={0}
          padAngle={0}
          cornerRadius={0}
          colors={{ datum: "data.color" }}
          borderWidth={2}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]]
          }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000"
                  }
                }
              ]
            }
          ]}
        />
      </Box>
    </Card>
  );
};
