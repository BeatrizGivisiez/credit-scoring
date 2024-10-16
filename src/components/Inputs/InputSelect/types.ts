import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export type Option = {
  value: number;
  label: string;
};

export type InputSelectProps = {
  options: Option[];
  value: number | undefined | string;
  onChange: (value: number) => void;
  label: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
};
