import { SxProps } from "@mui/material";

export const gridcoldef: SxProps = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  outline: "none", // Remove o foco visual
  "& .MuiDataGrid-cell:focus": {
    outline: "none" // Remove o foco visual das células
  },
  "& .MuiDataGrid-row:focus-within": {
    outline: "none" // Remove o foco visual das linhas
  }
};

export const table__datagrid: SxProps = {
  "& .MuiDataGrid-root": {
    fontSize: "14px"
  },
  "& .MuiDataGrid-columnHeaders": {
    fontSize: "15px"
  },
  "& .MuiDataGrid-cell": {
    fontSize: "14px"
  }
};
