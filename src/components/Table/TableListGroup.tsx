"use client";

import { memo } from "react";

import { ButtonIcon } from "@/components";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Eye, Pencil } from "@phosphor-icons/react";

import { gridcoldef } from "./styles";
import { TableListGroupProps } from "./types";

export const TableListGroup = memo(({ groups, onViewGroup, onEditGroup }: TableListGroupProps) => {
  const columns: GridColDef<(typeof groups)[number]>[] = [
    { field: "id", headerName: "ID", width: 90, headerAlign: "center", align: "center" },
    { field: "groupName", headerName: "Nome Grupo", width: 320 },
    { field: "createdAt", headerName: "Data Criação", width: 150 },
    { field: "quantityRelation", headerName: "Relações", width: 100 },
    {
      field: "parentClient",
      headerName: "Entidade-Mãe",
      width: 320
    },
    {
      field: "nif",
      headerName: "NIF",
      width: 120
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            height: "100%"
          }}
        >
          <Typography
            variant="body2"
            style={{
              color: params.value ? "green" : "red"
            }}
          >
            {params.value ? "Ativo" : "Inativo"}
          </Typography>
        </Box>
      )
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      renderCell: (params) => (
        <Box sx={gridcoldef}>
          <ButtonIcon
            placement="top-start"
            title="Visualizar"
            icon={Eye}
            onClick={() => onViewGroup(params.row)}
          />
          {params.row.status && ( // Só exibe o botão de edição se o status for "Ativo"
            <ButtonIcon
              placement="top-end"
              title="Editar"
              icon={Pencil}
              onClick={() => onEditGroup(params.row)}
            />
          )}
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={groups}
        rowCount={groups.length}
        columns={columns}
        pageSizeOptions={[10, 50, 100]}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          },
          sorting: {
            sortModel: [{ field: "status", sort: "desc" }]
          }
        }}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-root": {
            fontSize: "14px"
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "15px"
          },
          "& .MuiDataGrid-cell": {
            fontSize: "14px"
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none"
          },
          "& .MuiDataGrid-row:focus-within": {
            outline: "none"
          }
        }}
      />
    </Box>
  );
});

// Adicionando o displayName para o componente memoizado
TableListGroup.displayName = "TableListGroup";
