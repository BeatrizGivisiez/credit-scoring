"use client";

import { useState } from "react";

import { ButtonIcon, ModalCreateGroupEdit } from "@/components";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pencil, Trash } from "@phosphor-icons/react";

import { tableassociateentity__box, tableassociateentity__datagrid } from "./styles";
import { TableAssociateEntityProps } from "./types";
import { useCharacteristicRelation, useStepperContext } from "@/app/context";

export const TableAssociateEntity = ({
  createGroups,
  pageSize = 10,
  handleDeleteRow = () => {}
}: TableAssociateEntityProps) => {
  const { characteristicRelationActive } = useCharacteristicRelation();
  const { setAssociatedEntities } = useStepperContext();

  const [createGroupEditOpen, setCreateGroupEditOpen] = useState<boolean>(false);
  const [createGroupEditData, setCreateGroupEditData] = useState<any>(null); // Aqui você vai armazenar os dados do grupo

  // Verifique se os dados estão corretos
  console.log("Dados da tabela (createGroups):", createGroups);

  // Função para abrir o modal e passar os dados do grupo
  const handleOpenGroupEditModal = (group: any) => {
    console.log("||-> Group:", group);
    setCreateGroupEditData(group); // Armazena os dados do grupo que está sendo editado
    setCreateGroupEditOpen(true); // Abre o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setCreateGroupEditOpen(false);
  };

  const handleEditChild = (child: any) => {
    setAssociatedEntities((prev: any) => [...prev.filter((i: any) => i.id != child.id), child]);
    setCreateGroupEditOpen(false);
    setCreateGroupEditData(undefined);
  };

  // Função para obter o label de característica de relação
  const getCharacteristicRelationLabel = (id: number) => {
    const option = characteristicRelationActive.find((option) => option.economicGroupTypeId === id);
    return option ? option.name : "Desconhecido"; // Retorna "Desconhecido" se não encontrar
  };

  const columns: GridColDef<(typeof createGroups)[number]>[] = [
    { field: "name", headerName: "Nome Entidade", width: 620 },
    { field: "documentNumber", headerName: "NIF", width: 140 },
    {
      field: "characteristicRelation",
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
          parentClient={createGroupEditData.name} // Passa os dados do grupo
          nif={createGroupEditData.documentNumber}
          characteristicRelation={createGroupEditData.characteristicRelation} // Passa a característica de relação
          groupName={createGroupEditData.id} // Passa a entidade
          optionsEntity={[createGroupEditData]}
          optionRelation={characteristicRelationActive.map((i) => ({
            id: i.economicGroupTypeId,
            label: i.name
          }))}
          handleSubmit={handleEditChild}
        />
      )}
    </>
  );
};
