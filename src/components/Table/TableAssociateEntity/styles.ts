import { SxProps } from "@mui/material";

export const gridcoldef: SxProps = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: 1,
  outline: "none", // Remove o foco visual
  "& .MuiDataGrid-cell:focus": {
    outline: "none" // Remove o foco visual das células
  },
  "& .MuiDataGrid-row:focus-within": {
    outline: "none" // Remove o foco visual das linhas
  }
};
