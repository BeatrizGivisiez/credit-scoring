"use client";

import { useEffect, useMemo, useState } from "react";

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
import {
  useCreateEconomicGroupRelation,
  useEntitySelect,
  useFetchCharacteristicRelation
} from "@/hooks";
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
  const { characteristicRelation } = useFetchCharacteristicRelation();
  const { createEconomicGroupRelation, loading: loadingCreateEconomicGroupRelation } =
    useCreateEconomicGroupRelation();

  const [groupName, setGroupName] = useState<string>(""); // Nome do grupo
  const [associatefilhos, setAssociatefilhos] = useState<Array<any>>([]); // Lista de entidades associadas
  const [associatefilhosNames, setAssociatefilhosNames] = useState<Array<string>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [entitySelect, loading, entities] = useEntitySelect();
  const [selectedEntityObj, setSelectedEntityObj] = useState<EntityDTO>({} as EntityDTO);
  const [parentGroup, setParentGroup] = useState<string>("");
  const [selectedEntityRelation, setSelectedEntityRelation] = useState<string>("");

  const [alertData, setAlertData] = useState<{
    message: string;
    type: SeverityType;
  }>({
    message: "",
    type: "info"
  });

  const listAvailableEntities = useMemo(() => {
    return entitySelect.filter(
      (e) => e.value != parentGroup && !associatefilhosNames.includes(e.value)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentGroup, associatefilhosNames]);

  const optionsModal = useMemo(() => {
    return entitySelect.filter((e) => {
      return e.value == parentGroup || associatefilhosNames.includes(e.value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentGroup, associatefilhosNames]);

  useEffect(() => {
    const item =
      entities?.find((i) => i.documentNumber == selectedEntityRelation) ?? ({} as EntityDTO);
    setSelectedEntityObj(item);
  }, [entities, selectedEntityRelation]); //remover entities

  const handleAddChild = (child: any) => {
    setAssociatefilhos((prev) => [...prev, child]);
    setAssociatefilhosNames((prev) => [...prev, child["@Id"]]);
    setOpenModal(false);
    setSelectedEntityRelation("");
  };

  const handleDeleteChild = (childId: string) => {
    setAssociatefilhos((prev) => prev.filter((i) => i.documentNumber != childId));
  };

  // Função para lidar com a mudança de Nome do Grupo
  const handleGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setGroupName(event.target.value);

  const handleChangeEntity = (newValue: string) => {
    setSelectedEntityRelation(newValue); // Armazena a opção da Entidade
    setOpenModal(true);
  };

  // Controle dos passos
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (activeStep === 0 && (!groupName || !parentGroup)) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    } else if (activeStep === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Submete o passo 2
      // Valida se todas as entidades possuem `childId`
      // const entitiesWithValidChildId = associatefilhos.filter(
      //   (child) => child.documentNumber !== null
      // );

      // if (entitiesWithValidChildId.length !== associatefilhos.length) {
      //   alert("Algumas entidades associadas estão sem ID de entidade filho. Verifique os dados.");
      //   return;
      // }
      // Construa o DTO completo para o POST
      const newGroupRelation: EconomicGroupRelationDTO = {
        name: groupName,
        entityMotherId: parseInt(parentGroup), // Assume que o parentGroup é o ID
        entities: associatefilhos.map(
          (child: any): EconomicGroupRelationEntityDTO => ({
            parentId: parseInt(parentGroup),
            childId: parseInt(child.documentNumber),
            economicGroupTypeId: child.optionRelation
          })
        )
      };

      // Faça o POST de tudo em uma única requisição
      createEconomicGroupRelation(newGroupRelation)
        .then(() => {
          console.log("Grupo e relações criados com sucesso.");
          setAlertData({ message: "Grupo criado com sucesso!", type: "success" });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((e) => {
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
                  createGroups={associatefilhos}
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
              disabled={loadingCreateEconomicGroupRelation}
            />
          </Box>
          {selectedEntityRelation && openModal && (
            <ModalCreateRelationGroup
              open={openModal}
              handleClose={() => setOpenModal(false)}
              parentClient={selectedEntityObj.name} // Passa os dados da entidade
              nif={selectedEntityObj.documentNumber}
              optionsEntity={optionsModal}
              optionRelation={characteristicRelation.map((i) => ({
                id: i.economicGroupTypeId,
                label: i.name
              }))}
              // characteristicRelation={0} // Passa a característica de relação
              handleSubmit={handleAddChild}
            />
          )}
        </>
      )}
    </>
  );
};
