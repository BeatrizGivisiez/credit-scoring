"use client";

import { PowerBI } from "@/components";
import { Box, Card } from "@mui/material";
import { homeutp__box, homeutp__card } from "./styles";

export const HomeUTP = () => {
  return (
    <Box sx={homeutp__box}>
      <Card sx={homeutp__card}>
        <PowerBI />
      </Card>
    </Box>
  );
};
