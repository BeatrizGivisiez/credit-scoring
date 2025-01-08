"use client";

import { useCallback, useEffect, useState } from "react";

import { Button, ButtonIcon, Divider, InputRadio, InputSelect } from "@/components";
import { useEntitySelect, useRelationOption } from "@/hooks";
import PALETTE from "@/styles/_palette";
import { Box, Dialog, DialogTitle, FormControl, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";

import { modalrelateentityadd__box } from "./styles";
import { ModalRelateEntityAddProps } from "./types";
import { EntitySelectOption } from "@/hooks/entity/useEntitySelect";

export const ModalRelateEntityAdd = ({
  open,
  handleClose,
  listEntities,
  handleSubmit = () => {}
}: ModalRelateEntityAddProps) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [selectedEntity, setSelectedEntity] = useState<string>(""); // Entidade filha e nova
  const [selectedParentEntity, setSelectedParentEntity] = useState<string>(""); // Entidade mãe
  // const [entitySelect, loadingEntity] = useEntitySelect(); // Seleção de entidades (tanto mãe quanto filha)
  const [relationSelect] = useRelationOption(); // Seleção de característica de relação
  const [combinedEntities, setCombinedEntities] = useState<EntitySelectOption[]>([]);

  const [entitySelect, loadingEntity] = useEntitySelect();

  useEffect(() => {
    const newCombinedEntities = [...entitySelect, ...listEntities];
    if (newCombinedEntities.length !== combinedEntities.length) {
      setCombinedEntities(newCombinedEntities);
    }
  }, [entitySelect, listEntities, combinedEntities]);

  // Função para lidar com a seleção de relação (valor numérico)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value)); // Converte o valor para número
  };

  // Função para lidar com a seleção da entidade filha
  const handleChangeSelect = useCallback((newValue: string) => {
    setSelectedEntity(newValue);
  }, []);

  // Função para lidar com a seleção da entidade mãe
  const handleChangeParentSelect = useCallback((newValue: string) => {
    setSelectedParentEntity(newValue);
  }, []);

  // Verifica se todos os campos foram preenchidos (entidade mãe, filha e relação)
  const isSubmitDisabled = !selectedEntity || !selectedParentEntity || selectedOption === 0;

  const getChildId = () => selectedEntity.split("-")[0];
  const getChildNif = () => selectedEntity.split("-")[1];
  const getParentId = () => selectedParentEntity.split("-")[0];
  const getParentNif = () => selectedParentEntity.split("-")[1];

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
          options={combinedEntities}
          value={selectedEntity}
          onChange={handleChangeSelect}
          label="Indique a nova Entidade"
        />

        <Typography variant="h6" mt={4} mb={2}>
          Selecione a Entidade que pretende relacionar entre as existentes
        </Typography>
        <InputSelect
          fullWidth
          loading={loadingEntity}
          options={listEntities}
          value={selectedParentEntity}
          onChange={handleChangeParentSelect}
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
              childId: getChildId(), // Entidade filha selecionada (id <== , nif)
              childNif: getChildNif(),
              parentId: getParentId(), // Entidade mãe selecionada
              parentNif: getParentNif(),
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
