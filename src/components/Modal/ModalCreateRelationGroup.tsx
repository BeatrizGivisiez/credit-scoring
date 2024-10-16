"use client";

import { useState } from "react";

import { Button, ButtonIcon, InputRadio, InputSelect } from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, Dialog, DialogContent, DialogTitle, FormControl, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";

import { ModalCreateRelationGroupProps } from "./types";

export const ModalCreateRelationGroup = ({
  open,
  handleClose,
  parentClient,
  nif,
  optionsEntity,
  optionRelation,
  childId = 0,
  handleSubmit = () => {}
}: ModalCreateRelationGroupProps) => {
  // Agora o estado armazena um número (id) em vez de uma string
  const [selectedOption, setSelectedOption] = useState<number>(optionRelation || 0); // Iniciando com nenhuma
  const [selectedEntity, setSelectedEntity] = useState<number>();

  // Função para lidar com a seleção de relação (valor numérico)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value)); // Converte o valor para número
  };

  // Função para lidar com a seleção da entidade
  const handleChangeSelect = (newValue: number) => {
    setSelectedEntity(newValue); // Atualiza a entidade selecionada
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Adicionar relação - {parentClient} {nif}
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

      <Box sx={{ mx: 4, my: 2 }}>
        <Typography variant="h6" mb={1}>
          Selecione a entidade que pretende relacionar
        </Typography>
        <InputSelect
          fullWidth
          options={optionsEntity}
          value={selectedEntity} // Estado para controlar a entidade selecionada
          onChange={handleChangeSelect}
          label="Entidade-Mãe relacionada"
          sx={{ mt: 1, mb: 2 }}
        />
      </Box>

      <DialogContent dividers>
        <FormControl component="fieldset" sx={{ mx: 1, my: 2 }}>
          <InputRadio
            title="Característica de relação"
            options={optionRelation}
            selectedValue={selectedOption} // Estado para controlar o valor selecionado
            onChange={handleChange}
          />
        </FormControl>
      </DialogContent>

      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, gap: 2 }}>
        <Button
          label="Gravar"
          color="success"
          onClick={() =>
            handleSubmit({
              id: childId,
              parentId: selectedEntity,
              name: parentClient,
              documentNumber: nif,
              characteristicRelation: selectedOption
            })
          }
          iconEnd={FloppyDiskBack}
        />
      </Box>
    </Dialog>
  );
};
