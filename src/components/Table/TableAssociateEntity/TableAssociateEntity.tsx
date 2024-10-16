"use client";

import { useState } from "react";

import { ButtonIcon, ModalCreateGroupEdit } from "@/components";
import { useFetchCharacteristicRelation } from "@/hooks";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pencil, Trash } from "@phosphor-icons/react";

import { tableassociateentity__box, tableassociateentity__datagrid } from "./styles";
import { TableAssociateEntityProps } from "./types";

export const TableAssociateEntity = ({
  createGroups,
  pageSize = 10,
  handleDeleteRow = () => {}
}: TableAssociateEntityProps) => {
  const { characteristicRelation } = useFetchCharacteristicRelation();

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
    const option = characteristicRelation.find((option) => option.economicGroupTypeId === id);
    return option ? option.name : "Desconhecido"; // Retorna "Desconhecido" se não encontrar
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
        <Box sx={tableassociateentity__box}>
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
          getRowId={(i: any) => i.id}
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
          sx={tableassociateentity__datagrid}
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
