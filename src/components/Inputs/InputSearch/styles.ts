import { SxProps } from "@mui/material";

import PALETTE from "@/styles/_palette";

export const inputserch__box: SxProps = {
  display: "flex",
  boxShadow:
    "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
  borderRadius: "15px",
  backgroundColor: PALETTE.WHITE,
  height: "50px",
  gap: "16px"
};
export const inputserch__icon: SxProps = {
  display: "flex",
  alignItems: "center",
  width: "40px",
  height: "100%"
};

export const inputserch__base: SxProps = {
  flex: 1,
  marginLeft: 2
};
