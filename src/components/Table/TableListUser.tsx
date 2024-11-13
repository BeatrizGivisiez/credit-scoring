"use client";

import { Typography, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pencil } from "@phosphor-icons/react";
import { useState } from "react";

import { gridcoldef } from "./styles";
import { TableProps } from "./types";
import { ModalCreateUserEdit } from "../Modal/ModalCreateUserEdit";

import { ButtonIcon } from "@/components";

export const TableListUser = ({ userList, pageSize = 10 }: TableProps) => {
  const [createUserOpen, setCreateUserOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<(typeof userList)[number] | null>(null);

  const handleOpenCreateUser = (user: (typeof userList)[number]) => {
    setSelectedUser(user);
    setCreateUserOpen(true);
  };

  const handleCloseModal = () => {
    setCreateUserOpen(false);
    setSelectedUser(null);
  };

  const columns: GridColDef<(typeof userList)[number]>[] = [
    { field: "id", headerName: "ID", width: 90, headerAlign: "center", align: "center" },
    { field: "name", headerName: "Nome Utilizador", width: 550 },
    { field: "email", headerName: "E-mail", width: 350 },
    {
      field: "perfil",
      headerName: "Perfil",
      width: 150
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
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
      ),
      sortComparator: (v1, v2) => {
        if (v1 === v2) return 0;
        return v1 ? -1 : 1;
      }
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 80,
      renderCell: (params) => (
        <Box sx={gridcoldef}>
          <ButtonIcon
            placement="top-start"
            title="Editar"
            icon={Pencil}
            onClick={() => handleOpenCreateUser(params.row)}
          />
        </Box>
      )
    }
  ];

  return (
    <>
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={userList}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: "status", sort: "asc" }]
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
          sx={{
            "& .MuiDataGrid-root": {
              fontSize: "14px"
            },
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "15px"
            },
            "& .MuiDataGrid-cell": {
              fontSize: "14px"
            }
          }}
        />
      </Box>
      {selectedUser && (
        <ModalCreateUserEdit
          open={createUserOpen}
          handleClose={handleCloseModal}
          userName={selectedUser.name}
          email={selectedUser.email}
          password={selectedUser.password}
          perfil={`${selectedUser.perfil}`}
        />
      )}
    </>
  );
};
