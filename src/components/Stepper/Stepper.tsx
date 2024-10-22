"use client";

import { useEffect, useMemo, useState } from "react";

import { useCharacteristicRelation, useStepperContext } from "@/app/context";
import {
  EconomicGroupRelationDTO,
  EconomicGroupRelationEntityDTO
} from "@/app/dto/EconomicGroupRelationDto";
import { EntityDTO } from "@/app/dto/EntityDto";
import {
  Alert,
  Button,
  Card,
  InputSelect,
  InputText,
  ModalCreateRelationGroup,
  TableAssociateEntity
} from "@/components";
import { useCreateEconomicGroup, useEntitySelect } from "@/hooks";
import PALETTE from "@/styles/_palette";
import {
  Box,
  FormControl,
  Grid,
  Step,
  StepLabel,
  Stepper as MuiStepper,
  Typography
} from "@mui/material";
import { ArrowLeft, ArrowRight, Check, FloppyDiskBack } from "@phosphor-icons/react";

import { SeverityType } from "../Alert/types";
import { stepper__1step, stepper__active, stepper__box } from "./styles";

const steps = ["Dados do Grupo", "Associar Entidade"];

export const Stepper = () => {
  const { characteristicRelationActive } = useCharacteristicRelation();

  const { createEconomicGroup, loading: loadingCreateEconomicGroup } = useCreateEconomicGroup();

  const {
    groupName,
    setGroupName,
    parentGroup,
    setParentGroup,
    associatedEntities,
    setAssociatedEntities,
    associateEntitiesIds,
    setAssociateEntitiesIds,
    optionsModal
  } = useStepperContext();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [entitySelect, loading, entityNotInGroup] = useEntitySelect();
  const [selectedEntityObj, setSelectedEntityObj] = useState<EntityDTO>({} as EntityDTO);
  const [selectedEntityRelation, setSelectedEntityRelation] = useState<number | undefined>();

  const [alertData, setAlertData] = useState<{
    message: string;
    type: SeverityType;
  }>({
    message: "",
    type: "info"
  });

  const listAvailableEntities = useMemo(() => {
    return entitySelect.filter(
      (e: any) =>
        e.value.toString() !== parentGroup?.toString() &&
        !associateEntitiesIds.includes(e.value.toString())
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentGroup, associateEntitiesIds]);

  useEffect(() => {
    const item =
      entityNotInGroup?.find((i: any) => Number(i.entityId) === selectedEntityRelation) ??
      ({} as EntityDTO);

    setSelectedEntityObj(item);
  }, [entityNotInGroup, selectedEntityRelation]);

  const handleAddChild = (child: any) => {
    const newArray = [...associatedEntities];
    newArray.push(child);
    setAssociatedEntities(newArray);
    setAssociateEntitiesIds((prev) => [...prev, child.id.toString()]);
    setOpenModal(false);
    setSelectedEntityRelation(undefined);
  };

  const handleDeleteChild = (childId: string) => {
    setAssociatedEntities((prev) => prev.filter((i) => i.id.toString() !== childId));
  };

  // Função para lidar com a mudança de Nome do Grupo
  const handleGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setGroupName(event.target.value);

  const handleChangeEntity = (newValue: number) => {
    setSelectedEntityRelation(newValue); // Armazena a opção da Entidade
    setOpenModal(true);
  };

  console.log("associatedEntities ===========>", associatedEntities);
  // Controle dos passos
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (activeStep === 0 && (!groupName || !parentGroup)) {
      console.log("Nome do Grupo:", groupName);
      console.log("Entidade-Mãe (entityId):", selectedEntityObj.entityId);
      alert("Preencha todos os campos obrigatórios!");
      return;
    } else if (activeStep === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      console.log("associatedEntities", associatedEntities);
      // Construa o DTO completo para o POST
      const newGroupRelation: EconomicGroupRelationDTO = {
        name: groupName,
        entityMotherId: parentGroup!, // ID da entidade mãe (obrigatório)
        entities: associatedEntities.map(
          (child: any): EconomicGroupRelationEntityDTO => ({
            parentId: child.parentId, // Usando o ID da entidade mãe
            childId: child.id, // ID da entidade associada
            economicGroupTypeId: child.characteristicRelation // ID da relação econômica
          })
        )
      };

      // Faça o POST de tudo em uma única requisição
      createEconomicGroup(newGroupRelation)
        .then(() => {
          console.log("Grupo e relações criados com sucesso.");
          setAlertData({ message: "Grupo criado com sucesso!", type: "success" });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((e: any) => {
          console.error("Erro ao criar grupo e relações:", e);
          setAlertData({ message: "Erro ao criar grupo e relações!", type: "error" });
        });
    }
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <>
      <Box sx={stepper__box}>
        <MuiStepper activeStep={activeStep} sx={stepper__active}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconProps={{ sx: { fontSize: "2rem" } }}>
                <Typography variant="h6">{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </MuiStepper>
      </Box>

      {activeStep === steps.length ? (
        <Alert icon={Check} severity={alertData.type} label={alertData.message} />
      ) : (
        <>
          {activeStep === 0 && (
            <Grid container>
              <FormControl fullWidth sx={{ mt: 5 }}>
                <InputText
                  id="nome-grupo"
                  label="Nome do Grupo"
                  value={groupName}
                  onChange={handleGroupNameChange}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputSelect
                  loading={loading}
                  options={entitySelect}
                  value={parentGroup}
                  onChange={(e) => setParentGroup(e)}
                  label="Indique a Entidade-Mãe do Grupo"
                />
              </FormControl>
            </Grid>
          )}
          {activeStep === 1 && (
            <>
              <Box sx={stepper__1step}>
                <InputText
                  id="nome-grupo"
                  label="Nome do Grupo"
                  value={groupName} // Valor do Nome do Grupo preenchido na etapa 1
                  onChange={handleGroupNameChange}
                  disabled // Desabilitado para evitar alteração
                />
                <InputSelect
                  options={entitySelect}
                  value={parentGroup} // O valor da Entidade-Mãe selecionada na etapa 1
                  onChange={(e: any) => setParentGroup(e)}
                  label="Entidade-Mãe"
                  fullWidth={true}
                  disabled // Desabilitado para evitar alteração
                />
              </Box>
              <Grid container>
                <FormControl fullWidth>
                  <InputSelect
                    options={listAvailableEntities}
                    loading={loading}
                    value={selectedEntityRelation} // O valor da Entidade selecionada
                    onChange={(e) => handleChangeEntity(e)} // Função para mudar a Entidade
                    label="Entidade"
                  />
                </FormControl>
              </Grid>

              <Card>
                <Typography variant="h6" marginBottom={2} color={PALETTE.PRIMARY_MAIN}>
                  Entidades Associadas
                </Typography>
                <TableAssociateEntity
                  pageSize={5}
                  createGroups={associatedEntities}
                  handleDeleteRow={handleDeleteChild}
                />
              </Card>
            </>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            {activeStep > 0 && (
              <Button iconStart={ArrowLeft} label="Voltar" onClick={handleBack} color="inherit" />
            )}
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              iconEnd={activeStep === steps.length - 1 ? FloppyDiskBack : ArrowRight}
              label={activeStep === steps.length - 1 ? "Criar" : "Próximo"}
              onClick={handleNext}
              disabled={loadingCreateEconomicGroup}
            />
          </Box>
          {selectedEntityRelation && openModal && (
            <ModalCreateRelationGroup
              open={openModal}
              handleClose={() => setOpenModal(false)}
              parentClient={selectedEntityObj.name}
              nif={selectedEntityObj.documentNumber}
              childId={selectedEntityObj.entityId}
              optionsEntity={optionsModal}
              optionRelation={characteristicRelationActive.map((i) => ({
                id: i.economicGroupTypeId,
                label: i.name
              }))}
              handleSubmit={handleAddChild}
            />
          )}
        </>
      )}
    </>
  );
};
