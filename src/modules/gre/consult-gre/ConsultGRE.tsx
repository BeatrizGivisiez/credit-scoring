"use client";

import {
  Alert,
  Breadcrumbs,
  Button,
  Card,
  InputSearch,
  Loading,
  ModalListGroupEdit,
  ModalListGroupView,
  TableListGroup
} from "@/components";
import PALETTE from "@/styles/_palette";
import { Stack, Typography, CircularProgress, Box } from "@mui/material";
import { ArrowLeft, Check, MagnifyingGlass, Plus } from "@phosphor-icons/react";

import { useFetchPerfil } from "@/hooks/perfil/useFetchPerfil";
import { useSession } from "next-auth/react";
import { consultgre__breadcrumbs, consultgre__search, consultgre__table } from "./styles";
import { ConsultGREPageProps } from "./types";
import { useEffect, useState } from "react";

export const ConsultGREPage = ({
  isConsult,
  setIsConsult,
  handleSearch,
  setIsCreatingGroup,
  handleOpenModalView,
  handleOpenModalEdit,
  selectedGroup,
  handleCloseModal,
  breadcrumbsGREConsult,
  modalMode,
  filteredGroups,
  loading,
  error,
  fetchEconomicGroup
}: ConsultGREPageProps) => {
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
  }, [data, status, perfil]);

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
        {perfilId === null && loadingPerfil ? (
          // Exibe o carregamento enquanto o perfilId está sendo determinado
          <Box display="flex" justifyContent="center" alignItems="center" height="50px">
            <CircularProgress size={24} />
          </Box>
        ) : (
          (perfilId === 1 || perfilId === 2) && (
            // Exibe o botão "Criar Grupo" quando o carregamento é concluído
            <Button iconEnd={Plus} label="Criar Grupo" onClick={() => setIsCreatingGroup(true)} />
          )
        )}
      </Stack>

      <Card sx={consultgre__table}>
        <Typography variant="h6" mb={2} color={PALETTE.PRIMARY_MAIN}>
          Lista de Grupos
        </Typography>

        {loading && <Loading />}
        {error && (
          <Alert severity="error" label={`Erro ao carregar dados: ${error}`} icon={Check} />
        )}

        {!loading && !error && (
          <TableListGroup
            groups={filteredGroups.map((item) => ({
              id: item.economicGroupId,
              entityId: item.entityId,
              groupName: item.name,
              createdAt: item.created,
              quantityRelation: item.relationsCount,
              parentClient: item.entityMotherName,
              nif: item.entityMotherNIF,
              entityMotherId: item.entityMotherId,
              deletedAt: item.deleted ? "Inativo" : "Ativo",
              status: item.status
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
          <>
            <ModalListGroupEdit
              open={modalMode === "edit"}
              handleClose={handleCloseModal}
              id={selectedGroup.id}
              groupName={selectedGroup.groupName}
              parentClient={selectedGroup.parentClient}
              parentId={selectedGroup.entityMotherId}
              nif={selectedGroup.nif}
              user="Admin"
              version="1.0"
              createdAt={selectedGroup.createdAt}
              deletedAt={selectedGroup.deletedAt}
              lastUpdate={selectedGroup.createdAt}
              relations={selectedGroup.groupName}
              fetchEconomicGroup={fetchEconomicGroup}
            />
          </>
        )}
      </Card>
    </>
  );
};
