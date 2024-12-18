"use client";
import { Breadcrumbs, Button, Card, TableBackofficeEntity } from "@/components";
import { Box, Stack, Typography } from "@mui/material";
import { backoffice__box, backoffice__manager } from "./styles";
import { Plus } from "@phosphor-icons/react";
import PALETTE from "@/styles/_palette";
import { breadcrumbsBackofficeUTPEntity } from "@/constants/breadcrumbs";
import { UTP_ENTITY } from "@/app/_mocks/utpentity";

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

      {/* <ModalRelationAdd
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSave={handleAddRelation}
        relationList={[]}
      /> */}
    </>
  );
};
