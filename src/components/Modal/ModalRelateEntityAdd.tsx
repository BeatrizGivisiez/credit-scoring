"use client";

import { Box, Dialog, DialogTitle, FormControl, Grid, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import { useState } from "react";

import { ModalListGroupProps } from "./types";

import { Button, ButtonIcon, Divider, InputRadio, InputSelect } from "@/components";
import PALETTE from "@/styles/_palette";
import { useEntitySelect, useRelationOption } from "@/hooks";

export const ModalRelateEntityAdd = ({
  open,
  handleClose,
  characteristicRelation
}: ModalListGroupProps) => {
  // Agora o estado armazena um número (id) em vez de uma string
  const [selectedOption, setSelectedOption] = useState<string>("1"); // Iniciando com '1' como valor string
  const [selectedEntity, setSelectedEntity] = useState<string>("");

  const [entitySelect, loadingEntity] = useEntitySelect(); // Seleção de entidade
  const [relationSelect, loadingRelation] = useRelationOption(); // Seleção de característica de relação

  // Função para lidar com a seleção da entidade
  const handleChangeSelect = (newValue: string) => {
    setSelectedEntity(newValue); // Atualiza a entidade selecionada
  };

  // Função para lidar com a seleção de relação (valor numérico)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value); // Atualiza o valor do radio button selecionado
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
              loading={loadingEntity}
              options={entitySelect}
              value={selectedEntity}
              onChange={(value) => handleChangeSelect(value.toString())}
              label="Indique a Entidade que pretende adicionar"
            />
          </FormControl>
        </Grid>
      </FormControl>

      <Divider />

      <FormControl component="fieldset" sx={{ margin: 3 }}>
        <InputRadio
          title="Característica de relação"
          options={relationSelect}
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
