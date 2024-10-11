"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";

import { text } from "./styles";
import { InputTextProps } from "./types";

import PALETTE from "@/styles/_palette";

export const InputText = ({
  id,
  label,
  value,
  onChange,
  onKeyDown,
  disabled,
  type = "text",
  required = false
}: InputTextProps) => {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(event);

    if (required) {
      setError(newValue.trim() === "");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      id={id}
      fullWidth
      required={required}
      error={error}
      helperText={error ? "Este campo é obrigatório" : ""}
      label={label}
      value={value}
      onChange={handleInputChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      type={type === "password" && !showPassword ? "password" : "text"}
      sx={text}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <EyeSlash size={26} color={PALETTE.PRIMARY_MAIN} />
                    ) : (
                      <Eye size={26} color={PALETTE.PRIMARY_MAIN} />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }
          : undefined
      }
    />
  );
};
