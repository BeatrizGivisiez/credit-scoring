"use client";

import { Box, Dialog, DialogTitle, FormControl, Grid, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import { useState } from "react";

import { ModalListGroupProps } from "./types";

import { radioOptions } from "@/app/_mocks/radiooptions";
import { Button, ButtonIcon, Divider, InputRadio, InputSelect } from "@/components";
import PALETTE from "@/styles/_palette";
import { useEntitiesOptions } from "@/hooks/useEntitiesOptions";

export const ModalRelateEntityAdd = ({ open, handleClose }: ModalListGroupProps) => {
  // Agora o estado armazena um número (id) em vez de uma string
  const [selectedOption, setSelectedOption] = useState<number>(1); // Iniciando com 1 como padrão
  const [selectedEntity, setSelectedEntity] = useState<string>("");

  // Função para lidar com a seleção de relação (valor numérico)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value)); // Converte o valor para número
  };

  const [entitiesOptions, loading] = useEntitiesOptions();

  // Função para lidar com a seleção da entidade
  const handleChangeSelect = (newValue: string) => {
    setSelectedEntity(newValue); // Atualiza a entidade selecionada
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Adicionar relação
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

      <FormControl component="fieldset" sx={{ margin: 3 }}>
        <Typography variant="h6" mb={2} color={PALETTE.PRIMARY_MAIN}>
          Adicionar nova entidade ao grupo
        </Typography>

        <Grid container>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputSelect
              loading={loading}
              options={entitiesOptions}
              value={selectedEntity}
              onChange={handleChangeSelect}
              label="Indique a Entidade que pretende adicionar"
            />
          </FormControl>
        </Grid>
      </FormControl>

      <Divider />

      <FormControl component="fieldset" sx={{ margin: 3 }}>
        <InputRadio
          title="Característica de relação"
          options={radioOptions}
          selectedValue={selectedOption}
          onChange={handleChange}
        />
      </FormControl>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, gap: 2 }}>
        <Button label="Cancelar" color="success" onClick={handleClose} iconEnd={X} />
        <Button label="Gravar" color="success" onClick={() => {}} iconEnd={FloppyDiskBack} />
      </Box>
    </Dialog>
  );
};
