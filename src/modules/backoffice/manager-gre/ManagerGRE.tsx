"use client";

import { useState } from "react";

import {
  Alert,
  Breadcrumbs,
  Button,
  Card,
  Loading,
  ModalRelationAdd,
  TableListRelation
} from "@/components";
import { breadcrumbsBackofficeGRE } from "@/constants/breadcrumbs";
import { useCreateCharacteristicRelation, useFetchCharacteristicRelation } from "@/hooks";
import PALETTE from "@/styles/_palette";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Check, Plus } from "@phosphor-icons/react";

import { backoffice__box, backoffice__manager } from "./styles";
import { useDisableRelation } from "@/hooks/characteristicRelation/useDisableCharacteristicRelation";

export const ManagerGREPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { characteristicRelation, loading, error, fetchCharacteristicRelation } =
    useFetchCharacteristicRelation();
  const { createCharacteristicRelation } = useCreateCharacteristicRelation();
  const { disableCharacteristicRelation } = useDisableRelation();

  const handleAddRelation = async (newRelation: { label: string }) => {
    const createdRelation = await createCharacteristicRelation({ name: newRelation.label });
    if (createdRelation) {
      await fetchCharacteristicRelation();
      setModalOpen(false);
    }
  };

  // Função para inativar uma relação
  const handleInactivateRelation = async (id: number) => {
    await disableCharacteristicRelation(id);
    await fetchCharacteristicRelation();
  };

  return (
    <>
      <Box sx={backoffice__box}>
        <Stack sx={backoffice__manager}>
          <Breadcrumbs breadcrumbs={breadcrumbsBackofficeGRE} />
          <Button
            iconEnd={Plus}
            label={"Criar Característica"}
            onClick={() => setModalOpen(true)}
          />
        </Stack>
        <Card>
          <Typography variant="h6" mb={2} color={PALETTE.PRIMARY_MAIN}>
            Lista da Característica Relação
          </Typography>
          {loading && <Loading />}

          {error && (
            <Alert severity="error" label={`Erro ao carregar dados: ${error}`} icon={Check} />
          )}

          {!loading && !error && (
            <TableListRelation
              pageSize={10}
              relationList={characteristicRelation.map((item) => ({
                id: item.economicGroupTypeId,
                characteristicRelation: item.name,
                status: item.status,
                createdAt: item.created,
                deletedAt: item.deleted || undefined,
                inativar: item.inativar
              }))}
              onInactivate={handleInactivateRelation}
            />
          )}
        </Card>
      </Box>

      <ModalRelationAdd
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSave={handleAddRelation}
        relationList={[]}
      />
    </>
  );
};
