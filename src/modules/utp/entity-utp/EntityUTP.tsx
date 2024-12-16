"use client";

import { TABLEENTITY } from "@/app/_mocks/tableentity";
import { InputSearch, ModalEntityEdit, ModalEntityView, TableListEntity } from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, Card, Typography } from "@mui/material";
import { useState } from "react";
import { entityutp__box, entityutp__card } from "./styles";

export const EntityUTP = () => {
  const [modalMode, setModalMode] = useState<"view" | "edit" | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<any>(null); // Estado para a entidade selecionada

  const handleOpenModal = (mode: "view" | "edit", entity: any) => {
    setModalMode(mode);
    setSelectedEntity(entity); // Armazena a entidade selecionada
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedEntity(null); // Limpa a entidade selecionada
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
              documentType: item.documentType,
              clientSegment: item.clientSegment,
              location: item.location,
              comments: item.comments,
              lastUpdate: item.lastUpdate
            }))}
            onViewModal={(entity) => handleOpenModal("view", entity)}
            onEditModal={(entity) => handleOpenModal("edit", entity)}
          />
        </Card>
      </Box>

      {modalMode === "view" && selectedEntity && (
        <ModalEntityView open={true} handleClose={handleCloseModal} entityData={selectedEntity} />
      )}

      {modalMode === "edit" && selectedEntity && (
        <ModalEntityEdit open={true} handleClose={handleCloseModal} entityData={selectedEntity} />
      )}
    </>
  );
};
