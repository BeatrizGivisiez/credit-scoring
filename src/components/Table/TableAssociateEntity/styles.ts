import { SxProps } from "@mui/material";

export const tableassociateentity__box: SxProps = {
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

export const tableassociateentity__datagrid: SxProps = {
  "& .MuiDataGrid-root": {
    fontSize: "14px" // Aplica o tamanho da fonte
  },
  "& .MuiDataGrid-columnHeaders": {
    fontSize: "15px" // Aplica o tamanho da fonte aos cabeçalhos
  },
  "& .MuiDataGrid-cell": {
    fontSize: "14px" // Aplica o tamanho da fonte às células
  }
};
