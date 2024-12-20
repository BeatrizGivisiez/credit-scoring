"use client";
import { Grid, Typography } from "@mui/material";
import { GridItemProps } from "./types";

export const GridItem = ({ label, value }: GridItemProps) => (
  <Grid item xs={6} marginBottom={2}>
    <Typography variant="body1">
      <strong>{label}</strong>: {value}
    </Typography>
  </Grid>
);
