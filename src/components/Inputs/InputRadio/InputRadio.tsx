"use client";

import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";

import { inputradio__box, inputradio__form, inputradio__option } from "./styles";
import { InputRadioProps } from "./types";

export const InputRadio = ({ title, options, selectedValue, onChange }: InputRadioProps) => {
  return (
    <FormControl component="fieldset" sx={inputradio__form}>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <RadioGroup aria-label={title} value={selectedValue} onChange={onChange}>
        <Box sx={inputradio__box}>
          {options.map((option) => (
            <Box key={option.id} sx={inputradio__option}>
              <FormControlLabel
                value={option.id.toString()}
                control={<Radio />}
                label={option.label}
              />
            </Box>
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
