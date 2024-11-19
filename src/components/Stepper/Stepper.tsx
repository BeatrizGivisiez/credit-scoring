//src/components/Stepper/Stepper.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useCharacteristicRelation, useStepperContext } from "@/app/context";
import {
  EconomicGroupRelationDTO,
  EconomicGroupRelationEntityDTO
} from "@/app/dto/EconomicGroupRelationDto";
import { EntityDTO } from "@/app/dto/EntityDto";
import { Alert, Button, ModalCreateRelationGroup } from "@/components";
import { useCreateEconomicGroup, useEntitySelect } from "@/hooks";
import { Box, Dialog, Step, StepLabel, Stepper as MuiStepper, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight, Check, FloppyDiskBack, Warning } from "@phosphor-icons/react";

import { SeverityType } from "../Alert/types";
import { StepAssociateEntity } from "./StepAssociateEntity/StepAssociateEntity";
import { StepGroupDetails } from "./StepGroupDetails/StepGroupDetails";
import { stepper__active, stepper__box } from "./styles";

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
    optionsModal,
    validateGroupName
  } = useStepperContext();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [entitySelect, loading, entityNotInGroup] = useEntitySelect();
  const [selectedEntityObj, setSelectedEntityObj] = useState<EntityDTO>({} as EntityDTO);
  const [selectedEntityRelation, setSelectedEntityRelation] = useState<string | undefined>();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

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
      entityNotInGroup?.find(
        (i: any) => `${i.entityId}-${i.documentNumber}` === selectedEntityRelation
      ) ?? ({} as EntityDTO);
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
    setAssociatedEntities((prev) => prev.filter((i) => i.id.toString() !== childId)); // Remove a entidade associada
    setAssociateEntitiesIds((prev) => prev.filter((id) => id !== childId)); // Adiciona a entidade de volta às opções disponíveis
  };

  // Função para lidar com a mudança de Nome do Grupo
  const handleGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
    setAlertData({ message: "", type: "info" });
  };

  const handleChangeEntity = (newValue: string) => {
    setSelectedEntityRelation(newValue); // Armazena a opção da Entidade
    setOpenModal(true);
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (activeStep === 0) {
      const error = validateGroupName(groupName);
      if (error) {
        setAlertData({
          message: "O nome desse grupo já existe. Por favor, escolha outro nome.",
          type: "error"
        });
        setAlertOpen(true); // Abre o Dialog com o Alert
        return; // Bloqueia o avanço
      }
      if (!groupName || !parentGroup) {
        setAlertData({ message: "Preencha todos os campos obrigatórios!", type: "error" });
        setAlertOpen(true); // Abre o Dialog para o alerta de campos obrigatórios
        return;
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Construa o DTO completo para o POST
      const newGroupRelation: EconomicGroupRelationDTO = {
        name: groupName,
        entityMotherId: parentGroup!,
        entities: associatedEntities.map(
          (child: any): EconomicGroupRelationEntityDTO => ({
            parentId: child.parentId,
            childId: child.id,
            economicGroupTypeId: child.characteristicRelation
          })
        )
      };

      // Faça o POST de tudo em uma única requisição
      createEconomicGroup(newGroupRelation)
        .then(() => {
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
      {alertData.message && (
        <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
          <Alert
            icon={Warning}
            severity={alertData.type}
            onClose={() => setAlertData({ message: "", type: "info" })}
            label={alertData.message}
          ></Alert>
        </Dialog>
      )}

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
            <StepGroupDetails
              groupName={groupName}
              parentGroup={parentGroup}
              setParentGroup={setParentGroup}
              entitySelect={entitySelect}
              loading={loading}
              handleGroupNameChange={handleGroupNameChange}
            />
          )}
          {activeStep === 1 && (
            <StepAssociateEntity
              groupName={groupName}
              parentGroup={parentGroup}
              entitySelect={entitySelect}
              associatedEntities={associatedEntities}
              selectedEntityRelation={selectedEntityRelation}
              listAvailableEntities={listAvailableEntities}
              loading={loading}
              handleGroupNameChange={handleGroupNameChange}
              handleChangeEntity={handleChangeEntity}
              handleDeleteChild={handleDeleteChild}
              setParentGroup={setParentGroup}
            />
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
