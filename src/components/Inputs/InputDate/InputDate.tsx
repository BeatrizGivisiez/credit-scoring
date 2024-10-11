"use client";

import { Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

dayjs.locale("pt-br");

interface InputDateProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  disabled?: boolean;
}

export const InputDate = ({ label, value, onChange, disabled = false }: InputDateProps) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          value={value}
          onChange={onChange}
          format="YYYY-MM-DD"
          disableFuture
          disabled={disabled}
        />
      </LocalizationProvider>
    </Box>
  );
};
