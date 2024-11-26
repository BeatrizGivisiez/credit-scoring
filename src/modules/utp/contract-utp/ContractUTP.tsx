"use client";

import { Breadcrumbs, Button, InputSearch, TableListContracts } from "@/components";
import { breadcrumbsUTPContracts } from "@/constants/breadcrumbs";
import { Box, Card, Stack, Typography } from "@mui/material";
import { CaretLeft } from "@phosphor-icons/react";
import { contractsutp__box, contractsutp__stack, contractsutp__card } from "./styles";
import PALETTE from "@/styles/_palette";
import { TABLECONTRACTS } from "@/app/_mocks/tablecontracts";

export const ContractUTP = () => {
  return (
    <Box sx={contractsutp__box}>
      <Stack sx={contractsutp__stack}>
        <Breadcrumbs breadcrumbs={breadcrumbsUTPContracts} />
        <Button iconStart={CaretLeft} label={"Voltar"} onClick={() => {}} />
      </Stack>

      <InputSearch width={"500px"} placeholder="Nome Cliente ou NIF" onSearch={() => {}} />

      <Card sx={contractsutp__card}>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Lista de Contratos
        </Typography>

        <TableListContracts
          pageSize={10}
          contractsList={TABLECONTRACTS.map((item) => ({
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
