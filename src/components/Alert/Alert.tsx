"use client";

import { Alert as MuiAlert, Box, Typography } from "@mui/material";

import { alert__mui, stepper__box } from "./styles";
import { AlertProps } from "./types";

export const Alert = ({ severity, label, icon: IconStart }: AlertProps) => {
  return (
    <Box sx={stepper__box}>
      <MuiAlert icon={IconStart && <IconStart size={32} />} severity={severity} sx={alert__mui}>
        <Typography my={1}>{label}</Typography>
      </MuiAlert>
    </Box>
  );
};
