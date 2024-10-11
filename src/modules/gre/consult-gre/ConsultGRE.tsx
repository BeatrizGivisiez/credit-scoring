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
  modalOpenView,
  modalOpenEdit,
  selectedGroup,
  handleCloseModal,
  breadcrumbsGREConsult,
  loading,
  error,
  RELATION_ENTITY,
  handleSetPage = () => {},
  rowCount = undefined,
  itemsPerPage,
  setItemsPerPage
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
              id: item.id,
              groupName: item.name,
              createdAt: formatDate(item.createdAt),
              quantityRelation: item.quantityRelation || 0,
              parentClient: item.parentDetails.nmReduzido,
              nif: item.parentDetails.docId,
              deletedAt: item.deletedAt ? "Inativo" : "Ativo"
            }))}
            onViewGroup={handleOpenModalView}
            onEditGroup={handleOpenModalEdit}
            handleChangePagination={handleSetPage}
            rowCount={rowCount}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        )}

        {modalOpenView && selectedGroup && (
          <ModalListGroupView
            open={modalOpenView}
            handleClose={handleCloseModal}
            id={selectedGroup.id}
            groupName={selectedGroup.groupName}
            user="Admin"
            version="1.0"
            createdAt={selectedGroup.createdAt}
            deletedAt={selectedGroup.deletedAt}
            lastUpdate={selectedGroup.createdAt}
            relations={RELATION_ENTITY}
          />
        )}

        {modalOpenEdit && selectedGroup && (
          <ModalListGroupEdit
            open={modalOpenEdit}
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
            relations={RELATION_ENTITY}
          />
        )}
      </Card>
    </>
  );
};
