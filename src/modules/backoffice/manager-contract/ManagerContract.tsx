"use client";
import { Breadcrumbs, Button, Card, TableBackofficeContract } from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, Stack, Typography } from "@mui/material";
import { backoffice__box, backoffice__manager } from "./styles";
import { Plus } from "@phosphor-icons/react";
import { breadcrumbsBackofficeUTPContract } from "@/constants/breadcrumbs";
import { UTP_CONTRACT } from "@/app/_mocks/listcontract";

export const ManagerContract = () => {
  return (
    <>
      <Box sx={backoffice__box}>
        <Stack sx={backoffice__manager}>
          <Breadcrumbs breadcrumbs={breadcrumbsBackofficeUTPContract} />
          <Button
            iconEnd={Plus}
            label={"Criar Característica"}
            // onClick={() => setModalOpen(true)}
          />
        </Stack>
        <Card>
          <Typography variant="h6" mb={2} color={PALETTE.PRIMARY_MAIN}>
            Lista da Caracteristica Contratos
          </Typography>
          {/* {loading && <Loading />} */}
          {/* 
      {error && (
        <Alert severity="error" label={`Erro ao carregar dados: ${error}`} icon={Check} />
      )} */}

          {/* {!loading && !error && ( */}
          <TableBackofficeContract
            pageSize={10}
            backofficeContract={UTP_CONTRACT.map((item) => ({
              id: item.id,
              name: item.name,
              status: item.status,
              inativar: item.inativar
            }))}
            onInactivate={() => {}}
          />
          {/* // )}  */}
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
