"use client";

import { useEffect, useState } from "react";

import { Button, ButtonIcon, Divider, InputRadio, InputSelect } from "@/components";
import { useEntitySelect, useRelationOption } from "@/hooks";
import PALETTE from "@/styles/_palette";
import { Box, Dialog, DialogTitle, FormControl, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";

import { modalrelateentityadd__box } from "./styles";
import { ModalRelateEntityAddProps } from "./types";

export const ModalRelateEntityAdd = ({
  open,
  handleClose,
  handleSubmit = () => {}
}: ModalRelateEntityAddProps) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [selectedEntity, setSelectedEntity] = useState<number>(); // Entidade filha e nova
  const [selectedParentEntity, setSelectedParentEntity] = useState<number>(); // Entidade mãe

  const [entitySelect, loadingEntity] = useEntitySelect(); // Seleção de entidades (tanto mãe quanto filha)
  const [relationSelect] = useRelationOption(); // Seleção de característica de relação

  // Função para lidar com a seleção de relação (valor numérico)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value)); // Converte o valor para número
  };

  // Função para lidar com a seleção da entidade filha
  const handleChangeSelect = (newValue: number) => {
    setSelectedEntity(newValue); // Atualiza a entidade selecionada
  };

  // Função para lidar com a seleção da entidade mãe
  const handleChangeParentSelect = (newValue: number) => {
    setSelectedParentEntity(newValue); // Atualiza a entidade mãe selecionada
  };

  // Verifica se todos os campos foram preenchidos (entidade mãe, filha e relação)
  const isSubmitDisabled = !selectedEntity || !selectedParentEntity || selectedOption === 0;

  useEffect(() => {
    console.log("Entidade filha selecionada mudou:", selectedEntity);
  }, [selectedEntity]);

  useEffect(() => {
    console.log("Entidade mãe selecionada mudou:", selectedParentEntity);
  }, [selectedParentEntity]);

  useEffect(() => {
    console.log("Relação selecionada mudou:", selectedOption);
  }, [selectedOption]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Adicionar Nova Entidade
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

      <Box sx={{ m: 4 }}>
        <Typography variant="h6" mb={2}>
          Selecione a nova Entidade que predente adicionar ao grupo
        </Typography>
        <InputSelect
          fullWidth
          loading={loadingEntity}
          options={entitySelect}
          value={selectedEntity}
          onChange={(value) => handleChangeSelect(Number(value))}
          label="Indique a nova Entidade"
        />

        <Typography variant="h6" mt={4} mb={2}>
          Selecione a Entidade que pretende relacionar entre as existentes
        </Typography>
        <InputSelect
          fullWidth
          loading={loadingEntity}
          options={entitySelect} // trocar, irmaos e mae do grupo.
          value={selectedParentEntity}
          onChange={(value) => handleChangeParentSelect(Number(value))}
          label="Indique a Entidade Associada"
        />
      </Box>

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
      <Box sx={modalrelateentityadd__box}>
        <Button label="Cancelar" color="success" onClick={handleClose} iconEnd={X} />
        <Button
          label="Gravar"
          color="success"
          onClick={() => {
            handleSubmit({
              childId: selectedEntity, // Entidade filha selecionada
              parentId: selectedParentEntity, // Entidade mãe selecionada
              characteristicRelation: selectedOption // Tipo de relação
            });
          }}
          iconEnd={FloppyDiskBack}
          disabled={isSubmitDisabled}
        />
      </Box>
    </Dialog>
  );
};
