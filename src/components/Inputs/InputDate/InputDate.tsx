"use client";
import { Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { InputDateProps } from "./types";

dayjs.locale("pt-br");

export const InputDate = ({ label, value, onChange, disabled = false }: InputDateProps) => {
  const handleDateChange = (newValue: Dayjs | null) => {
    // Impede seleção de datas futuras
    if (newValue && newValue.isAfter(dayjs())) {
      onChange(dayjs()); // Volta ao valor atual se for uma data futura
    } else {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          value={value}
          onChange={handleDateChange}
          disableFuture
          disabled={disabled}
          views={["year", "month", "day"]}
          slotProps={{
            textField: {
              inputProps: { readOnly: true },
              fullWidth: true // Garante que o campo ocupe toda a largura disponível
            }
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};
