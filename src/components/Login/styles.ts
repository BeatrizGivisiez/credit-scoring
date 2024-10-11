import { SxProps } from "@mui/material";

import PALETTE from "@/styles/_palette";

export const login__box: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: PALETTE.SECONDARY_MAIN,
  gap: 3,
  mb: 10
};

export const login__card: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "400px",
  gap: 4,
  marginTop: "16px",
  marginBottom: "16px",
  marginRight: "8px"
};

export const login__input: SxProps = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  width: "100%"
};
