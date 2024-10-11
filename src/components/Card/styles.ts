import { SxProps } from "@mui/material";

import PALETTE from "@/styles/_palette";

export const card: SxProps = {
  borderRadius: 3,
  backgroundColor: PALETTE.WHITE,
  boxShadow:
    "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px"
};

export const cardinfo: SxProps = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  borderRadius: 3,
  backgroundColor: PALETTE.WHITE,
  boxShadow:
    "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px"
};
export const cardinfo__box: SxProps = {
  display: "flex",
  justifyContent: "row",
  alignItems: "center",
  justifyItems: "flex-start",
  width: "30%",
  paddingLeft: 3
};
export const cardinfo__typography: SxProps = {
  display: "flex",
  flexDirection: "column",
  width: "70%"
};
