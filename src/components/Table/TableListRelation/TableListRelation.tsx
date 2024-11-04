"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Check, MinusCircle } from "@phosphor-icons/react";
import { Box, Alert, Dialog, Typography } from "@mui/material";
import { useState } from "react";

import { gridcoldef, table__box, table__datagrid } from "./styles";
import { TableRelationProps } from "./types";
import { ButtonIcon } from "@/components";

export const TableListRelation = ({
  relationList, // Lista de relações passada como prop
  pageSize = 10,
  onInactivate // Função de inativação passada pelo componente pai
}: TableRelationProps & { onInactivate: (id: number) => void }) => {
  const [alertOpen, setAlertOpen] = useState(false); // Controle de estado para o alerta
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("error");

  // Função para inativar e exibir o alerta
  const handleInactivate = (id: number) => {
    onInactivate(id); // Chama a função passada via prop para inativar o item no estado do ManagerGREPage
    setAlertMessage("A característica relação foi inativada com sucesso.");
    setAlertSeverity("error");
    setAlertOpen(true);
  };

  // Configuração das colunas da tabela
  const columns: GridColDef<(typeof relationList)[number]>[] = [
    { field: "id", headerName: "ID", width: 100, headerAlign: "center", align: "center" },
    { field: "characteristicRelation", headerName: "Característica Relação", width: 780 },
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
      width: 120,
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
        console.log("Status:", params.row.status); // Verifique o valor de status aqui
        return params.row.status === true || params.row.status === "Ativo" ? ( // Ajuste a condição
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
          rows={relationList}
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
