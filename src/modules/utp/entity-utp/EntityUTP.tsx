"use client";

import { InputSearch, TableListEntity } from "@/components";
import { Box, Card, Typography } from "@mui/material";
import { entityutp__box, entityutp__card } from "./styles";
import PALETTE from "@/styles/_palette";
import { TABLEENTITY } from "@/app/_mocks/tableentity";
import { ModalEntity } from "@/components/Modal/ModalEntity/ModalEntity";
import { useState } from "react";

export const EntityUTP = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Box sx={entityutp__box}>
        <InputSearch width={"500px"} placeholder="Nome Cliente ou NIF" onSearch={() => {}} />

        <Card sx={entityutp__card}>
          <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
            Lista de Entidades
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
            openModal={handleOpenModal}
          />
        </Card>
      </Box>
      <ModalEntity
        open={openModal}
        handleClose={handleCloseModal}
        entityData={{
          id: "123",
          nif: "123456789",
          documentType: "Passaporte",
          clientSegment: "Premium",
          location: "Lisboa",
          socialDebt: "Sim",
          financialDifficulty: "Alta",
          comments: "Nenhum comentário",
          lastUpdate: "2024-11-27"
        }}
      />
    </>
  );
};
