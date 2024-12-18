"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TableListContractsProps } from "./types";
import { Box } from "@mui/material";
import { gridcoldef, table__datagrid } from "./styles";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { Eye, Pencil } from "@phosphor-icons/react";

export const TableListContracts = ({
  onViewModal,
  onEditModal,
  pageSize = 10,
  contractsList
}: TableListContractsProps) => {
  const columns: GridColDef<(typeof contractsList)[number]>[] = [
    { field: "id", headerName: "ID", width: 50, headerAlign: "center", align: "center" },
    { field: "name", headerName: "Nome", width: 200 },
    { field: "nif", headerName: "NIF", width: 100 },
    {
      field: "reestruturadoPorDificuldadesFinanceiras",
      headerName: "Dif. Financeiras",
      width: 140
    },
    {
      field: "reestruturadoSemDificuldadesFinanceiras",
      headerName: "Sem Dif. Financeiras",
      width: 140
    },
    {
      field: "defaultTecnico",
      headerName: "defaultTecnico",
      width: 100
    },
    {
      field: "writeOff",
      headerName: "writeOff",
      width: 80
    },
    {
      field: "chargeOff",
      headerName: "chargeOff",
      width: 80
    },
    {
      field: "quebraDeContrato",
      headerName: "quebraDeContrato",
      width: 80
    },
    {
      field: "emNegociacao",
      headerName: "emNegociacao",
      width: 80
    },
    {
      field: "reestruturado",
      headerName: "reestruturado",
      width: 80
    },
    {
      field: "pari",
      headerName: "pari",
      width: 80
    },
    {
      field: "persi",
      headerName: "persi",
      width: 80
    },
    {
      field: "per",
      headerName: "per",
      width: 80
    },
    {
      field: "tribunal",
      headerName: "tribunal",
      width: 80
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 120,
      renderCell: (params) => {
        const contract = params.row;
        return (
          <Box sx={gridcoldef}>
            <ButtonIcon
              placement="top-start"
              title="Visualizar"
              icon={Eye}
              onClick={() => onViewModal(contract)}
            />
            <ButtonIcon
              placement="top-end"
              title="Editar"
              icon={Pencil}
              onClick={() => onEditModal(contract)}
            />
          </Box>
        );
      }
    }
  ];

  return (
    <>
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={contractsList}
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
    </>
  );
};
