"use client";
import { useState } from "react";

import { Button, ButtonIcon, Divider, InputText } from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import { ModalManagerContractProps } from "./types";

// Função para gerar a data atual no formato YYYY/MM/DD
const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA").replace(/-/g, "/");
};

export const ModalManagerContract = ({
  open,
  handleClose,
  onSave,
  relationContract
}: ModalManagerContractProps) => {
  const [label, setLabel] = useState("");

  // Função para obter o próximo ID sequencial com base na lista existente
  const getNextId = () => {
    const maxId = relationContract.reduce(
      (max: any, relation: any) => (relation.id > max ? relation.id : max),
      0
    );
    return maxId + 1; // Retorna o próximo ID
  };

  // Função para limpar os campos após salvar
  const clearForm = () => {
    setLabel("");
  };

  // Função para gravar a nova relação
  const handleSave = () => {
    const newRelation = {
      id: getNextId(),
      label,
      status: true,
      createdAt: getTodayDate(),
      deletedAt: ""
    };
    onSave(newRelation);
    clearForm();
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Criar Nova Característica de Contrato
        </Typography>
        <ButtonIcon
          placement="top-start"
          title="Fechar"
          icon={X}
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          weight="regular"
        />
      </DialogTitle>

      <Divider />

      <Box sx={{ marginX: 5, marginY: 8, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <InputText
            id="label"
            label="Nome da Característica Contrato"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required={true}
          />
        </Box>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, gap: 2 }}>
        <Button label="Cancelar" color="success" onClick={handleClose} iconEnd={X} />
        <Button label="Gravar" color="success" onClick={handleSave} iconEnd={FloppyDiskBack} />
      </Box>
    </Dialog>
  );
};
