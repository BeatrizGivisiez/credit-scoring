"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TableListEntityProps, EntityList } from "./types";
import { Box } from "@mui/material";
import { gridcoldef, table__datagrid } from "./styles";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { Eye, Pencil } from "@phosphor-icons/react";

export const TableListEntity = ({
  onViewModal,
  onEditModal,
  pageSize = 10,
  entityList
}: TableListEntityProps) => {
  const columns: GridColDef<EntityList>[] = [
    { field: "id", headerName: "ID", width: 50, headerAlign: "center", align: "center" },
    { field: "name", headerName: "Nome", headerAlign: "left", align: "left", width: 230 },
    { field: "nif", headerName: "NIF", headerAlign: "left", align: "left", width: 100 },
    {
      field: "documentType",
      headerName: "Tipo de Documento",
      headerAlign: "left",
      align: "left",
      width: 185
    },
    {
      field: "clientSegment",
      headerName: "Segmento",
      headerAlign: "left",
      align: "left",
      width: 150
    },
    { field: "location", headerName: "Localidade", headerAlign: "left", align: "left", width: 150 },
    { field: "comments", headerName: "Comentário", headerAlign: "left", align: "left", width: 200 },
    {
      field: "lastUpdate",
      headerName: "Última Atualização",
      headerAlign: "left",
      align: "left",
      width: 180
    },

    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const entity = params.row;
        return (
          <Box sx={gridcoldef}>
            <ButtonIcon
              placement="top-start"
              title="Visualizar"
              icon={Eye}
              onClick={() => onViewModal(entity)}
            />
            <ButtonIcon
              placement="top-end"
              title="Editar"
              icon={Pencil}
              onClick={() => onEditModal(entity)}
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
          rows={entityList}
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
