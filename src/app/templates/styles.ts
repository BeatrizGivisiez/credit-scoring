import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

import PALETTE from "@/styles/_palette";

export const layoutdefault__box: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  backgroundColor: PALETTE.SECONDARY_MAIN,
  height: "100vh",
  overflow: "hidden"
};
export const breadcrumb__main: SxProps = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column"
};
export const breadcrumb__children: SxProps = {
  flexGrow: 1,
  padding: "0px 24px 24px 0",
  display: "flex",
  alignItems: "center",
  gap: 2,
  flexDirection: "column",
  overflowX: "hidden",
  width: "100%",
  pl: 2
};
