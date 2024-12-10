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
    { field: "name", headerName: "Nome", width: 400 },
    { field: "nif", headerName: "NIF", width: 100 },
    { field: "email", headerName: "E-mail", width: 200 },
    { field: "phone", headerName: "Telefone", width: 100 },
    { field: "address", headerName: "Morada", width: 380 },
    {
      field: "actions",
      headerName: "Ações",
      width: 80,
      renderCell: () => {
        return (
          <Box sx={gridcoldef}>
            <ButtonIcon
              placement="top-start"
              title="Visualizar"
              icon={Eye}
              onClick={() => onViewModal()} // Passa a entidade para a função
            />
            <ButtonIcon
              placement="top-end"
              title="Editar"
              icon={Pencil}
              onClick={() => onEditModal()} // Passa a entidade para a função
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
