"use client";

import { Box, InputBase } from "@mui/material";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { inputserch__base, inputserch__box, inputserch__icon } from "./styles";
import { InputSearchProps } from "./types";

import PALETTE from "@/styles/_palette";

export const InputSearch = ({ placeholder, onSearch, width }: InputSearchProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (onSearch) {
      onSearch(query);
    }
  }, [query, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Box sx={{ ...inputserch__box, width: { width } }}>
      <InputBase
        sx={inputserch__base}
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <Box sx={inputserch__icon}>
        <MagnifyingGlass size={24} color={PALETTE.PRIMARY_MAIN} />
      </Box>
    </Box>
  );
};
