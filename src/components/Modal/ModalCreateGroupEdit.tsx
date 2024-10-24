"use client";

import { Box, Dialog, DialogContent, DialogTitle, FormControl, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import { useState, useEffect, useMemo } from "react";

import { ModalListGroupProps } from "./types";

import { Button, ButtonIcon, InputRadio, InputSelect } from "@/components";
import { useStepperContext } from "@/app/context";
import PALETTE from "@/styles/_palette";
import { IAssocietedEntitiesContext } from "@/app/context/StepperContext";

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
  const { optionsModal, associatedEntities } = useStepperContext();

  // Agora o estado armazena um número (id) em vez de uma string
  const [selectedOption, setSelectedOption] = useState<number>(characteristicRelation || 0); // Iniciando com nenhuma
  const [selectedEntity, setSelectedEntity] = useState<any>(0);

  const isSubmitDisabled = selectedEntity === 0 || selectedOption === 0;

  // Função para lidar com a seleção de relação (valor numérico)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value)); // Converte o valor para número
  };

  // Função para lidar com a seleção da entidade
  const handleChangeSelect = (newValue: number) => {
    setSelectedEntity(newValue); // Atualiza a entidade selecionada
  };

  const parentGroupName = useMemo(() => {
    const option = optionsModal.find((i: any) => i.value == selectedEntity)?.label ?? "";
    return option.split("-")[0].trim();
  }, [selectedEntity]);

  const groupId = useMemo(() => {
    return (
      associatedEntities.find((i: any) => i.documentNumber == nif) ??
      ({} as IAssocietedEntitiesContext)
    ).id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nif]);

  useEffect(() => {
    setSelectedEntity(Number.parseInt(parentClient ?? "0"));
  }, [parentClient]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Editar - {groupName} {nif}
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
          options={optionsModal.filter((i: any) => i.value != groupId)}
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
              id: groupId,
              name: groupName,
              parentId: Number.parseInt(parentClient ?? "0"),
              documentNumber: nif,
              parentName: parentGroupName,
              characteristicRelation: selectedOption
            })
          }
          iconEnd={FloppyDiskBack}
          disabled={isSubmitDisabled}
        />
      </Box>
    </Dialog>
  );
};
