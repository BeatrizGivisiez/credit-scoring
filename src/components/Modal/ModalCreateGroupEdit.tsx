"use client";

import { Box, Dialog, DialogContent, DialogTitle, FormControl, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

import { ModalListGroupProps } from "./types";

import { Button, ButtonIcon, InputRadio, InputSelect } from "@/components";
import { useStepperContext } from "@/app/context";
import PALETTE from "@/styles/_palette";

export const ModalCreateGroupEdit = ({
  open,
  handleClose,
  parentClient,
  characteristicRelation,
  groupName = "",
  nif,
  optionRelation,
  handleSubmit = () => {}
}: ModalListGroupProps) => {
  const { optionsModal } = useStepperContext();

  // Agora o estado armazena um número (id) em vez de uma string
  const [selectedOption, setSelectedOption] = useState<number>(characteristicRelation || 0); // Iniciando com nenhuma
  const [selectedEntity, setSelectedEntity] = useState<any>(groupName);

  // Função para lidar com a seleção de relação (valor numérico)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value)); // Converte o valor para número
  };

  // Função para lidar com a seleção da entidade
  const handleChangeSelect = (newValue: number) => {
    setSelectedEntity(newValue); // Atualiza a entidade selecionada
  };

  useEffect(() => {
    setSelectedEntity(groupName);
  }, [groupName]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Editar - {parentClient} {nif}
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
          Selecione a entidade que deseja associar
        </Typography>
        <InputSelect
          fullWidth
          options={optionsModal}
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
              id: selectedEntity,
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
