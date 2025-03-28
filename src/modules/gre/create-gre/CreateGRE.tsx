"use client";

import { Box, Stack } from "@mui/material";
import { ArrowLeft } from "@phosphor-icons/react";
import { creategre__box, creategre__stack } from "./styles";
import { Breadcrumbs, Button, Stepper } from "@/components";
import { breadcrumbsGRECreate } from "@/constants/breadcrumbs";
import { useEconomicGroup, useStepperContext } from "@/app/context"; // Importa o contexto

export const CreateGREPage = ({ setIsCreatingGroup }: any) => {
  const { fetchEconomicGroup } = useEconomicGroup(); // Usa a função para atualizar os grupos
  const { resetStepper } = useStepperContext(); // Adiciona o reset dos dados do Stepper

  const handleBackClick = () => {
    fetchEconomicGroup(); // Atualiza a lista de grupos econômicos
    setIsCreatingGroup(false); // Sai do modo de criação
    resetStepper(); // Reseta os dados do Stepper ao sair
  };

  return (
    <Box sx={creategre__box}>
      <Stack sx={creategre__stack}>
        <Breadcrumbs breadcrumbs={breadcrumbsGRECreate} />
        <Button
          iconStart={ArrowLeft}
          onClick={handleBackClick} // Usa a função handleBackClick para atualizar e voltar
          label="Voltar"
        />
      </Stack>

      <Stepper />
    </Box>
  );
};
