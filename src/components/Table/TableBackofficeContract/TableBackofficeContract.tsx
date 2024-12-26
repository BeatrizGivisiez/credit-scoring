"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Check, MinusCircle } from "@phosphor-icons/react";
import { Box, Alert, Dialog, Typography } from "@mui/material";
import { useState } from "react";

import { gridcoldef, table__box, table__datagrid } from "./styles";
import { TableBackofficeContractProps } from "./types";
import { ButtonIcon } from "@/components";

export const TableBackofficeContract = ({
  backofficeContract,
  pageSize = 10,
  onInactivate
}: TableBackofficeContractProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("error");

  const handleInactivate = (id: number) => {
    onInactivate(id);
    setAlertMessage("A característica dos Contratos foi inativada com sucesso.");
    setAlertSeverity("error");
    setAlertOpen(true);
  };

  const columns: GridColDef<(typeof backofficeContract)[number]>[] = [
    { field: "id", headerName: "ID", width: 100, headerAlign: "center", align: "center" },
    { field: "name", headerName: "Característica Contratos", width: 760 },
    {
      field: "createdAt",
      headerName: "Data Inicial",
      width: 130,
      renderCell: (params) => (
        <Box sx={table__box}>
          <Typography variant="body2">
            {params.row.createdAt ? params.row.createdAt : "-"}
          </Typography>
        </Box>
      )
    },
    {
      field: "deletedAt",
      headerName: "Data Fim",
      width: 130,
      renderCell: (params) => (
        <Box sx={table__box}>
          <Typography variant="body2">
            {params.row.deletedAt ? params.row.deletedAt : "-"}
          </Typography>
        </Box>
      )
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Box sx={table__box}>
          <Typography variant="body2" style={{ color: params.row.status ? "green" : "red" }}>
            {params.row.status ? "Ativo" : "Inativo"}
          </Typography>
        </Box>
      )
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 80,
      renderCell: (params) => {
        return params.row.inativar === true && params.row.status === true ? (
          <Box sx={gridcoldef}>
            <ButtonIcon
              placement="top-start"
              title="Inativar"
              icon={MinusCircle}
              onClick={() => handleInactivate(params.row.id)}
            />
          </Box>
        ) : null;
      }
    }
  ];

  return (
    <>
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={backofficeContract}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: "status", sort: "desc" }]
            },
            pagination: {
              paginationModel: {
                pageSize: pageSize
              }
            }
          }}
          pageSizeOptions={[10, 50, 100]}
          autoHeight
          disableRowSelectionOnClick
          sx={table__datagrid}
        />
      </Box>

      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <Alert
          icon={<Check />}
          severity={alertSeverity}
          onClose={() => setAlertOpen(false)}
          sx={{ padding: 2 }}
        >
          {alertMessage}
        </Alert>
      </Dialog>
    </>
  );
};
