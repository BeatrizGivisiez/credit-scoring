import { SxProps } from "@mui/system";
import PALETTE from "@/styles/_palette";

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
