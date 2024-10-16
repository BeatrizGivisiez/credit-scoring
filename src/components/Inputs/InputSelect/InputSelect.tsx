"use client";

import { Autocomplete, FormControl, TextField } from "@mui/material";

import { select } from "./styles";
import { Option, InputSelectProps } from "./types";

export const InputSelect = ({
  options,
  value,
  onChange,
  label,
  sx,
  fullWidth,
  disabled,
  loading = false
}: InputSelectProps) => {
  // Encontrar a opção selecionada com base no valor (que será um número)
  const selectedOption = options.find((option) => option.value === value) || null;

  return (
    <FormControl variant="outlined" sx={sx} fullWidth={fullWidth} required>
      <Autocomplete
        value={selectedOption}
        onChange={(event, newValue: Option | null) => {
          // Se houver uma nova opção selecionada, envie o valor (número), senão, envie 0
          onChange(newValue ? Number(newValue.value) : 0);
        }}
        options={options}
        getOptionLabel={(option: Option) => option.label} // Mostrar o label corretamente
        isOptionEqualToValue={(option, selectedOption) => option.value === selectedOption?.value}
        disabled={disabled || loading}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" sx={select} disabled={disabled} />
        )}
        sx={{ "& .MuiAutocomplete-inputRoot": { pl: 2 }, minWidth: 200 }}
      />
    </FormControl>
  );
};
