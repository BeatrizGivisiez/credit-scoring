"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TableListEntityProps } from "./types";
import { Box } from "@mui/material";
import { gridcoldef, table__datagrid } from "./styles";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { Eye } from "@phosphor-icons/react";

export const TableListEntity = ({ openModal, pageSize = 10, entityList }: TableListEntityProps) => {
  const columns: GridColDef<(typeof entityList)[number]>[] = [
    { field: "id", headerName: "ID", width: 50, headerAlign: "center", align: "center" },
    { field: "name", headerName: "Nome", width: 400 },
    { field: "nif", headerName: "NIF", width: 100 },
    {
      field: "email",
      headerName: "E-mail",
      width: 200
    },
    {
      field: "phone",
      headerName: "Telefone",
      width: 100
    },
    {
      field: "address",
      headerName: "Morada",
      width: 380
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 80,
      renderCell: () => {
        return (
          <Box sx={gridcoldef}>
            <ButtonIcon placement="top-start" title="Visualizar" icon={Eye} onClick={openModal} />
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
