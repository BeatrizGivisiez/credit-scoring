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

export const button: SxProps = {
  mt: 4,
  textTransform: "none",
  textUnderline: "none",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: { xs: "space-between", lg: "center" },
  color: PALETTE.PRIMARY_MAIN,
  fontSize: "1.2rem",
  lineHeight: "1",
  fontFamily: "Noto sans",
  borderRadius: "23px",
  padding: "13px 30px",
  minWidth: "unset",
  width: "fit-content"
};
