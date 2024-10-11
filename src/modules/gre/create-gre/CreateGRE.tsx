"use client";

import { Box, Stack } from "@mui/material";
import { ArrowLeft } from "@phosphor-icons/react";

import { creategre__box, creategre__stack } from "./styles";

import { Breadcrumbs, Button, Stepper } from "@/components";
import { breadcrumbsGRECreate } from "@/constants/breadcrumbs";

export const CreateGREPage = ({ setIsCreatingGroup }: any) => {
  return (
    <Box sx={creategre__box}>
      <Stack sx={creategre__stack}>
        <Breadcrumbs breadcrumbs={breadcrumbsGRECreate} />
        <Button
          iconStart={ArrowLeft}
          onClick={() => {
            setIsCreatingGroup(false);
          }}
          label="Voltar"
        />
      </Stack>
      <Stepper />
    </Box>
  );
};
