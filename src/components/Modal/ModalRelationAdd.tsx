"use client";
import { useState } from "react";

import { Button, ButtonIcon, Divider, InputText } from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";

// Função para gerar a data atual no formato YYYY/MM/DD
const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA").replace(/-/g, "/"); // Formato YYYY/MM/DD
};

export const ModalRelationAdd = ({ open, handleClose, onSave, relationList }: any) => {
  const [label, setLabel] = useState(""); // Estado para controlar o nome da característica

  // Função para obter o próximo ID sequencial com base na lista existente
  const getNextId = () => {
    const maxId = relationList.reduce(
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
      status: true, // Status ativo por padrão
      createdAt: getTodayDate(), // Relaciona automaticamente a data de hoje
      deletedAt: "" // Campo deletedAt vazio por padrão
    };

    onSave(newRelation); // Função passada como prop para adicionar a nova relação
    clearForm();
    handleClose(); // Fecha o modal após salvar
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Criar Nova Característica Relação
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
            label="Nome da Característica Relação"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required={true} // Campo obrigatório
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
