import { SxProps } from "@mui/material";

export const select: SxProps = {
  borderRadius: "15px",
  boxShadow:
    "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
  bgcolor: "white",
  "& .MuiOutlinedInput-root": {
    borderRadius: "15px",
    "& fieldset": {
      borderColor: "grey"
    },
    "&:hover fieldset": {
      borderColor: "grey"
    },
    "&.Mui-focused fieldset": {
      borderColor: "grey"
    }
  }
};
