"use client";

import { Breadcrumbs, Button, InputSearch, TableListEntity } from "@/components";
import { breadcrumbsUTPClients } from "@/constants/breadcrumbs";
import { Box, Card, Stack, Typography } from "@mui/material";
import { CaretLeft } from "@phosphor-icons/react";
import { entityutp__box, entityutp__stack, entityutp__card } from "./styles";
import PALETTE from "@/styles/_palette";
import { TABLEENTITY } from "@/app/_mocks/tableentity";

export const EntityUTP = () => {
  return (
    <Box sx={entityutp__box}>
      <Stack sx={entityutp__stack}>
        <Breadcrumbs breadcrumbs={breadcrumbsUTPClients} />
        <Button iconStart={CaretLeft} label={"Voltar"} onClick={() => {}} />
      </Stack>

      <InputSearch width={"500px"} placeholder="Nome Cliente ou NIF" onSearch={() => {}} />

      <Card sx={entityutp__card}>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Lista de Clientes
        </Typography>

        <TableListEntity
          pageSize={10}
          entityList={TABLEENTITY.map((item) => ({
            id: item.id,
            name: item.name,
            nif: item.nif,
            email: item.email,
            phone: item.phone,
            address: item.address
          }))}
        />
      </Card>
    </Box>
  );
};
