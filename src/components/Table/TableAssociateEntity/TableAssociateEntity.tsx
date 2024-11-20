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
  const { associatedEntities, setAssociatedEntities } = useStepperContext();

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

  const handleEditChild = (child: any) => {
    console.log(">>>", child, associatedEntities);

    setAssociatedEntities((prev: any) => {
      const index = prev.findIndex((entity: any) => entity.documentNumber === child.documentNumber); // Encontrar o índice da entidade

      if (index !== -1) {
        // Se a entidade existir, substitua-a
        const updatedEntities = [...prev];
        updatedEntities[index] = child;
        return updatedEntities;
      } else {
        // Se a entidade não existir, adicione-a (não deveria acontecer nesse caso de edição)
        return [...prev, child];
      }
    });

    // Fecha o modal e limpa os dados
    setCreateGroupEditOpen(false);
    setCreateGroupEditData(undefined);
  };

  // Função para obter o label de característica de relação
  const getCharacteristicRelationLabel = (id: number) => {
    const option = characteristicRelationActive.find((option) => option.economicGroupTypeId === id);
    return option ? option.name : "Desconhecido"; // Retorna "Desconhecido" se não encontrar
  };

  const columns: GridColDef<(typeof createGroups)[number]>[] = [
    { field: "name", headerName: "Nome Entidade", width: 450 },
    { field: "documentNumber", headerName: "NIF", width: 120 },
    {
      field: "characteristicRelation",
      headerName: "Característica Relação",
      width: 300,
      valueGetter: (params) => getCharacteristicRelationLabel(params)
    },
    { field: "parentName", headerName: "Entidade Associada", width: 320 },
    {
      field: "actions",
      headerName: "Ações",
      width: 90,
      renderCell: (params) => (
        <Box sx={tableassociateentity__box}>
          <ButtonIcon
            placement="top-start"
            title="Editar"
            icon={Pencil}
            onClick={() => handleOpenGroupEditModal(params.row)}
          />
          <ButtonIcon
            placement="top-end"
            title="Excluir"
            icon={Trash}
            onClick={() => handleDeleteRow(`${params.id}-${params.row.nif}`)}
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
          autoHeight
          disableRowSelectionOnClick
          sx={tableassociateentity__datagrid}
        />
      </Box>
      {createGroupEditOpen && createGroupEditData && (
        <ModalCreateGroupEdit
          open={createGroupEditOpen}
          handleClose={handleCloseModal}
          parentClient={`${createGroupEditData?.parentId}-${createGroupEditData?.parentNif}`} // Passa os dados do grupo
          nif={createGroupEditData.documentNumber}
          characteristicRelation={createGroupEditData.characteristicRelation} // Passa a característica de relação
          groupName={createGroupEditData.name} // Passa a entidade
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
