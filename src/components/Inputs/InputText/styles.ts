import { SxProps } from "@mui/material";

export const text: SxProps = {
  boxShadow:
    "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
  bgcolor: "white",
  borderRadius: "15px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "15px"
  },
  "& .MuiFormHelperText-root": {
    ml: 2
  }
};
