"use client";
import PALETTE from "@/styles/_palette";
import { Box, Paper, Typography } from "@mui/material";

import { cardinfo, cardinfo__box, cardinfo__typography } from "./styles";
import { CardInfoProps } from "./types";

export const CardInfo = ({ title, subTitle, icon: Icon, padding = 3 }: CardInfoProps) => {
  const paddingDefault = typeof padding === "boolean" ? (padding ? 3 : 0) : padding;

  return (
    <Paper sx={{ ...cardinfo, padding: paddingDefault }} elevation={0}>
      <Box sx={cardinfo__box}>
        <Icon
          size={52}
          style={{ cursor: "pointer" }}
          color={PALETTE.PRIMARY_MAIN}
          weight="duotone"
        />
      </Box>

      <Box sx={cardinfo__typography}>
        <Typography variant="h4" color={PALETTE.PRIMARY_MAIN}>
          {title}
        </Typography>
        <Typography variant="body1" color={PALETTE.PRIMARY_MAIN}>
          {subTitle}
        </Typography>
      </Box>
    </Paper>
  );
};
