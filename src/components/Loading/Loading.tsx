"use client";
import { Box, CircularProgress } from "@mui/material";
import { loading__box } from "./styles";

export const Loading = () => {
  return (
    <Box sx={loading__box}>
      <CircularProgress />
    </Box>
  );
};
