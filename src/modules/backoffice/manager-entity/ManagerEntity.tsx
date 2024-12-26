"use client";
import { UTP_ENTITY } from "@/app/_mocks/utpentity";
import { Breadcrumbs, Button, Card, ModalManagerEntity, TableBackofficeEntity } from "@/components";
import { breadcrumbsBackofficeUTPEntity } from "@/constants/breadcrumbs";
import PALETTE from "@/styles/_palette";
import { Box, Stack, Typography } from "@mui/material";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { backoffice__box, backoffice__manager } from "./styles";

export const ManagerEntity = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Box sx={backoffice__box}>
        <Stack sx={backoffice__manager}>
          <Breadcrumbs breadcrumbs={breadcrumbsBackofficeUTPEntity} />
          <Button
            iconEnd={Plus}
            label={"Criar Característica"}
            onClick={() => setModalOpen(true)}
          />
        </Stack>
        <Card>
          <Typography variant="h6" mb={2} color={PALETTE.PRIMARY_MAIN}>
            Lista da Caracteristica Entidades
          </Typography>
          {/* {loading && <Loading />} */}
          {/* 
          {error && (
            <Alert severity="error" label={`Erro ao carregar dados: ${error}`} icon={Check} />
          )} */}

          {/* {!loading && !error && ( */}
          <TableBackofficeEntity
            pageSize={10}
            backofficeEntity={UTP_ENTITY.map((item) => ({
              id: item.id,
              name: item.name,
              status: item.status,
              inativar: item.inativar
            }))}
            onInactivate={() => {}}
          />
          {/* )} */}
        </Card>
      </Box>

      <ModalManagerEntity
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSave={() => {}}
        relationEntity={""}
      />
    </>
  );
};
