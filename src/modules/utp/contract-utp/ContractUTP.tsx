"use client";

import { InputSearch, TableListContracts } from "@/components";
import { Box, Card, Typography } from "@mui/material";
import { contractsutp__box, contractsutp__card } from "./styles";
import PALETTE from "@/styles/_palette";
import { TABLECONTRACTS } from "@/app/_mocks/tablecontracts";
import { useState } from "react";
import { ModalContract } from "@/components/Modal/ModalContract/ModalContract";

export const ContractUTP = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Box sx={contractsutp__box}>
        <InputSearch width={"500px"} placeholder="Número do Contrato" onSearch={() => {}} />

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
            openModal={handleOpenModal}
          />
        </Card>
      </Box>
      <ModalContract open={openModal} handleClose={handleCloseModal} handleSubmit={() => {}} />
    </>
  );
};
