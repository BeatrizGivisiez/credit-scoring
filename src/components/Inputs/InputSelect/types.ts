import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export type Option = {
  value: string;
  label: string;
};

export type InputSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
};
