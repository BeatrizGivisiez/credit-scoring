"use client";

import { EntitySelectOption } from "@/hooks/entity/useEntitySelect";
import { Theme } from "@emotion/react";
import { Autocomplete, FormControl, SxProps, TextField } from "@mui/material";
import { select } from "./styles";

export type InputSelectProps = {
  options: EntitySelectOption[];
  value: string | undefined;
  onChange: (value: string) => void;
  label: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

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
        onChange={(event, newValue: EntitySelectOption | null) => {
          onChange(newValue?.value || "");
        }}
        options={options}
        getOptionLabel={(option: EntitySelectOption) => option.label}
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
