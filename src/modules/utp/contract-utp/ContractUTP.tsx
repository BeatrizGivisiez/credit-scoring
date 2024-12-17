"use client";

import { TABLECONTRACTS } from "@/app/_mocks/tablecontracts";
import {
  InputSearch,
  ModalContractEdit,
  ModalContractView,
  TableListContracts
} from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, Card, Typography } from "@mui/material";
import { useState } from "react";
import { contractsutp__box, contractsutp__card } from "./styles";

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
      <ModalContractEdit open={openModal} handleClose={handleCloseModal} handleSubmit={() => {}} />
      <ModalContractView open={openModal} handleClose={handleCloseModal} handleSubmit={() => {}} />
    </>
  );
};
