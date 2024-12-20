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
      width: 140,
      renderCell: (params) => (params.row.reestruturadoPorDificuldadesFinanceiras ? "Sim" : "Não")
    },
    {
      field: "reestruturadoSemDificuldadesFinanceiras",
      headerName: "Sem Dif. Financeiras",
      width: 140,
      renderCell: (params) => (params.row.reestruturadoSemDificuldadesFinanceiras ? "Sim" : "Não")
    },
    {
      field: "defaultTecnico",
      headerName: "Default Técnico",
      width: 100,
      renderCell: (params) => (params.row.defaultTecnico ? "Sim" : "Não")
    },
    {
      field: "writeOff",
      headerName: "Write Off",
      width: 80,
      renderCell: (params) => (params.row.writeOff ? "Sim" : "Não")
    },
    {
      field: "chargeOff",
      headerName: "Charge Off",
      width: 80,
      renderCell: (params) => (params.row.chargeOff ? "Sim" : "Não")
    },
    {
      field: "quebraDeContrato",
      headerName: "Quebra de Contrato",
      width: 80,
      renderCell: (params) => (params.row.quebraDeContrato ? "Sim" : "Não")
    },
    {
      field: "emNegociacao",
      headerName: "Em Negociação",
      width: 80,
      renderCell: (params) => (params.row.emNegociacao ? "Sim" : "Não")
    },
    {
      field: "reestruturado",
      headerName: "Reestruturado",
      width: 80,
      renderCell: (params) => (params.row.reestruturado ? "Sim" : "Não")
    },
    {
      field: "pari",
      headerName: "PARI",
      width: 80,
      renderCell: (params) => (params.row.pari ? "Sim" : "Não")
    },
    {
      field: "persi",
      headerName: "PERSI",
      width: 80,
      renderCell: (params) => (params.row.persi ? "Sim" : "Não")
    },
    {
      field: "per",
      headerName: "PER",
      width: 80,
      renderCell: (params) => (params.row.per ? "Sim" : "Não")
    },
    {
      field: "tribunal",
      headerName: "Tribunal",
      width: 80,
      renderCell: (params) => (params.row.tribunal ? "Sim" : "Não")
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
