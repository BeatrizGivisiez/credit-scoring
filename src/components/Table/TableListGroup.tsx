"use client";

import { memo, useEffect, useState } from "react";

import { ButtonIcon } from "@/components";
import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Eye, Pencil } from "@phosphor-icons/react";

import { gridcoldef } from "./styles";
import { TableListGroupProps } from "./types";
import { useFetchPerfil } from "@/hooks/perfil/useFetchPerfil";
import { useSession } from "next-auth/react";

export const TableListGroup = memo(({ groups, onViewGroup, onEditGroup }: TableListGroupProps) => {
  const { data, status } = useSession(); // Dados da sessão
  const { perfil, loading: loadingPerfil } = useFetchPerfil(); // Hook para buscar perfis
  const [perfilId, setPerfilId] = useState<number | null>(null);

  useEffect(() => {
    const matchEmailWithPerfil = () => {
      if (status === "authenticated" && data?.user?.email && perfil.length > 0) {
        const userPerfil = perfil.find((p) => p.email === data.user.email); // Compara o email
        if (userPerfil) {
          setPerfilId(userPerfil.perfilId); // Define o perfilId do usuário
        }
      }
    };

    matchEmailWithPerfil();
  }, [status, data, perfil]);

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
          {params.row.status &&
            (loadingPerfil ? ( // Enquanto `loadingPerfil` for true, mostra o indicador de carregamento
              <Box display="flex" justifyContent="center" alignItems="center" height="50px">
                <CircularProgress size={24} />
              </Box>
            ) : (
              (perfilId === 1 || perfilId === 2) && (
                <ButtonIcon
                  placement="top-end"
                  title="Editar"
                  icon={Pencil}
                  onClick={() => onEditGroup(params.row)}
                />
              )
            ))}
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={groups}
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
