import { SxProps } from "@mui/system";

import PALETTE from "@/styles/_palette";

export const emailconfirmation_box: SxProps = {
  py: "80px",
  height: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
export const emailconfirmation_container: SxProps = {
  width: "800px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 4
};
export const emailconfirmation_title: SxProps = {
  fontSize: "2rem"
};
export const emailconfirmation_description: SxProps = {
  color: PALETTE.GRAY_700,
  textAlign: "center",
  fontSize: "1.25rem"
};
