"use client";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pencil, Trash } from "@phosphor-icons/react";
import { useState } from "react";

import { gridcoldef } from "./styles";
import { TableAssociatedEntitiesEGProps } from "./types";
import { ModalCreateGroupEdit } from "../Modal/ModalCreateGroupEdit";

import { radioOptions } from "@/app/_mocks/radiooptions";
import { ButtonIcon } from "@/components";

export const TableAssociatedEntitiesEG = ({
  createGroups,
  pageSize = 10,
  handleDeleteRow = (i: string) => {}
}: TableAssociatedEntitiesEGProps) => {
  const [createGroupEditOpen, setCreateGroupEditOpen] = useState<boolean>(false);
  const [createGroupEditData, setCreateGroupEditData] = useState<any>(null); // Aqui você vai armazenar os dados do grupo

  // Função para abrir o modal e passar os dados do grupo
  const handleOpenGroupEditModal = (group: any) => {
    setCreateGroupEditData(group); // Armazena os dados do grupo que está sendo editado
    setCreateGroupEditOpen(true); // Abre o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setCreateGroupEditOpen(false);
  };

  // Função para obter o label de característica de relação
  const getCharacteristicRelationLabel = (id: number) => {
    const option = radioOptions.find((option) => option.id === id);
    return option ? option.label : "Desconhecido"; // Retorna o label ou "Desconhecido" se não encontrar
  };

  const columns: GridColDef<(typeof createGroups)[number]>[] = [
    { field: "nmReduzido", headerName: "Nome Entidade", width: 620 },
    { field: "docId", headerName: "NIF", width: 140 },
    {
      field: "optionRelation",
      headerName: "Característica Relação",
      width: 400,
      valueGetter: (params) => getCharacteristicRelationLabel(params)
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      renderCell: (params) => (
        <Box sx={gridcoldef}>
          <ButtonIcon
            placement="top-start"
            title="Editar"
            icon={Pencil}
            onClick={() => handleOpenGroupEditModal(params.row)} // Abre o modal e passa os dados
          />
          <ButtonIcon
            placement="top-end"
            title="Excluir"
            icon={Trash}
            onClick={() => handleDeleteRow(params.id.toString())}
          />
        </Box>
      )
    }
  ];

  return (
    <>
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          getRowId={(i: any) => i.docId}
          rows={createGroups}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize
              }
            }
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-root": {
              fontSize: "14px" // Aplica o tamanho da fonte
            },
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "15px" // Aplica o tamanho da fonte aos cabeçalhos
            },
            "& .MuiDataGrid-cell": {
              fontSize: "14px" // Aplica o tamanho da fonte às células
            }
          }}
        />
      </Box>
      {createGroupEditOpen && createGroupEditData && (
        <ModalCreateGroupEdit
          open={createGroupEditOpen}
          handleClose={handleCloseModal}
          parentClient={createGroupEditData.parentClient} // Passa os dados do grupo
          nif={createGroupEditData.nif}
          characteristicRelation={createGroupEditData.characteristicRelation} // Passa a característica de relação
          groupName={createGroupEditData.groupName} // Passa a entidade
        />
      )}
    </>
  );
};
