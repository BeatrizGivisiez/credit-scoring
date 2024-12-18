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
  const [modalMode, setModalMode] = useState<"view" | "edit" | null>(null);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  const handleOpenModal = (mode: "view" | "edit", entity: any) => {
    setModalMode(mode);
    setSelectedContract(entity);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedContract(null);
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
              reestruturadoPorDificuldadesFinanceiras: item.reestruturadoPorDificuldadesFinanceiras,
              reestruturadoSemDificuldadesFinanceiras: item.reestruturadoSemDificuldadesFinanceiras,
              defaultTecnico: item.defaultTecnico,
              writeOff: item.writeOff,
              chargeOff: item.chargeOff,
              quebraDeContrato: item.quebraDeContrato,
              emNegociacao: item.emNegociacao,
              reestruturado: item.reestruturado,
              pari: item.pari,
              persi: item.persi,
              per: item.per,
              tribunal: item.tribunal
            }))}
            onViewModal={(contract) => handleOpenModal("view", contract)}
            onEditModal={(contract) => handleOpenModal("edit", contract)}
          />
        </Card>
      </Box>
      {modalMode === "view" && selectedContract && (
        <ModalContractView
          open={true}
          handleClose={handleCloseModal}
          contractData={selectedContract}
        />
      )}

      {modalMode === "edit" && selectedContract && (
        <ModalContractEdit
          open={true}
          handleClose={handleCloseModal}
          contractData={selectedContract}
          handleSubmit={() => {}}
        />
      )}
    </>
  );
};
