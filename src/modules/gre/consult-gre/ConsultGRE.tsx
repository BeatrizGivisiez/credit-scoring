"use client";

import {
  Alert,
  Breadcrumbs,
  Button,
  Card,
  InputSearch,
  ModalListGroupEdit,
  ModalListGroupView,
  TableListGroup
} from "@/components";
import PALETTE from "@/styles/_palette";
import { formatDate } from "@/utils/formatDate";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ArrowLeft, Check, MagnifyingGlass, Plus } from "@phosphor-icons/react";

import {
  consultgre__breadcrumbs,
  consultgre__loading,
  consultgre__search,
  consultgre__table
} from "./styles";
import { ConsultGREPageProps } from "./types";

export const ConsultGREPage = ({
  isConsult,
  setIsConsult,
  handleSearch,
  filteredGroups,
  setIsCreatingGroup,
  handleOpenModalView,
  handleOpenModalEdit,
  selectedGroup,
  handleCloseModal,
  breadcrumbsGREConsult,
  loading,
  error,
  modalMode
}: ConsultGREPageProps) => {
  return (
    <>
      <Stack sx={consultgre__breadcrumbs}>
        <Breadcrumbs breadcrumbs={breadcrumbsGREConsult} />
        <Button
          iconStart={isConsult ? MagnifyingGlass : ArrowLeft}
          onClick={() => setIsConsult(!isConsult)}
          label={isConsult ? "Consultar" : "Voltar"}
        />
      </Stack>

      <Stack sx={consultgre__search}>
        <InputSearch
          width={"500px"}
          placeholder="Nome Grupo, Entidades ou NIF"
          onSearch={handleSearch}
        />
        <Button iconEnd={Plus} label="Criar Grupo" onClick={() => setIsCreatingGroup(true)} />
      </Stack>

      <Card sx={consultgre__table}>
        <Typography variant="h6" mb={2} color={PALETTE.PRIMARY_MAIN}>
          Lista de Grupos
        </Typography>

        {loading && (
          <Box sx={consultgre__loading}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" label={`Erro ao carregar dados: ${error}`} icon={Check} />
        )}

        {!loading && !error && (
          <TableListGroup
            groups={filteredGroups.map((item) => ({
              id: item.economicGroupId,
              groupName: item.name,
              createdAt: item.createdAt || "falta vir BE",
              quantityRelation: item.quantityRelation || "falta vir BE",
              parentClient: item.entityMother || "falta vir BE",
              nif: item.entityMother || "falta vir BE",
              deletedAt: item.deletedAt ? "Inativo" : "Ativo"
            }))}
            onViewGroup={handleOpenModalView}
            onEditGroup={handleOpenModalEdit}
          />
        )}

        {modalMode === "view" && selectedGroup && (
          <ModalListGroupView
            open={modalMode === "view"}
            handleClose={handleCloseModal}
            id={selectedGroup.id}
            groupName={selectedGroup.groupName}
            user="Admin"
            version="1.0"
            createdAt={selectedGroup.createdAt}
            deletedAt={selectedGroup.deletedAt}
            lastUpdate={selectedGroup.createdAt}
            relations={selectedGroup.groupName}
          />
        )}

        {modalMode === "edit" && selectedGroup && (
          <ModalListGroupEdit
            open={modalMode === "edit"}
            handleClose={handleCloseModal}
            id={selectedGroup.id}
            groupName={selectedGroup.groupName}
            parentClient={selectedGroup.parentClient}
            nif={selectedGroup.nif}
            user="Admin"
            version="1.0"
            createdAt={selectedGroup.createdAt}
            deletedAt={selectedGroup.deletedAt}
            lastUpdate={selectedGroup.createdAt}
            relations={selectedGroup.groupName}
          />
        )}
      </Card>
    </>
  );
};
