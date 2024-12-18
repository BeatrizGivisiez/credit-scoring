"use client";
import { Breadcrumbs, Button, Card } from "@/components";
import { Box, Stack, Typography } from "@mui/material";
import { backoffice__box, backoffice__manager } from "./styles";
import { Plus } from "@phosphor-icons/react";
import PALETTE from "@/styles/_palette";
import { breadcrumbsBackofficeUTPEntity } from "@/constants/breadcrumbs";

export const ManagerEntity = () => {
  return (
    <>
      <Box sx={backoffice__box}>
        <Stack sx={backoffice__manager}>
          <Breadcrumbs breadcrumbs={breadcrumbsBackofficeUTPEntity} />
          <Button
            iconEnd={Plus}
            label={"Criar Característica"}
            // onClick={() => setModalOpen(true)}
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

          {/* {!loading && !error && (
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
          )} */}
        </Card>
      </Box>

      {/* <ModalRelationAdd
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSave={handleAddRelation}
        relationList={[]}
      /> */}
    </>
  );
};
