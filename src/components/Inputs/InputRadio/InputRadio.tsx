"use client";

import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { InputRadioProps } from "./types";

export const InputRadio = ({ title, options, selectedValue, onChange }: InputRadioProps) => {
  return (
    <FormControl component="fieldset">
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <RadioGroup aria-label={title} value={selectedValue} onChange={onChange}>
        <Box>
          {options.map((option) => (
            <Box key={option.id}>
              <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
            </Box>
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
