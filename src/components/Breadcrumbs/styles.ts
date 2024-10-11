import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

import PALETTE from "@/styles/_palette";

export const breadcrumb__link: CSSProperties = {
  display: "flex",
  gap: "6px",
  textDecoration: "none",
  color: PALETTE.PRIMARY_MAIN
};
export const breadcrumb__icon: SxProps = {
  height: "20px",
  display: "flex",
  alignItems: "center",
  fontSize: "16px"
};
