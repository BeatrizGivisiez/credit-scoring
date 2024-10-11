"use client";

import { Box, Typography } from "@mui/material";
import { House, Plugs } from "@phosphor-icons/react";

import {
  emailconfirmation_box,
  emailconfirmation_container,
  emailconfirmation_description,
  emailconfirmation_title
} from "./styles";

import { Button } from "@/components";
import PALETTE from "@/styles/_palette";

export default function NotFound() {
  return (
    <Box sx={emailconfirmation_box}>
      <Box sx={emailconfirmation_container}>
        <Plugs size={100} weight="duotone" color={PALETTE.PRIMARY_MAIN} />
        <Typography sx={emailconfirmation_title}>Oops! Not Found</Typography>
        <Typography sx={emailconfirmation_description}>Página não encontrada</Typography>
        <Button href="/" iconStart={House} label="Voltar ao início" />
      </Box>
    </Box>
  );
}
