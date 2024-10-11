"use client";
import { Paper } from "@mui/material";

import { card } from "./styles";
import { CardProps } from "./types";

export const Card = ({ children, padding = 3 }: CardProps) => {
  const paddingDefault = typeof padding === "boolean" ? (padding ? 3 : 0) : padding;

  return (
    <Paper sx={{ ...card, padding: paddingDefault }} elevation={0}>
      {children}
    </Paper>
  );
};
