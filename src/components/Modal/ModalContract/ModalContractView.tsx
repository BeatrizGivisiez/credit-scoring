"use client";

import { ButtonIcon, Divider } from "@/components";
import {
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography
} from "@mui/material";
import { X } from "@phosphor-icons/react";
import { ModalContractViewProps } from "./types";
import PALETTE from "@/styles/_palette";

export const ModalContractView = ({ open, handleClose, contractData }: ModalContractViewProps) => {
  const options = [
    "Reestruturado por dificuldades financeiras",
    "Reestruturado SEM dificuldades financeiras",
    "Default Técnico",
    "Write off",
    "Charge off",
    "Quebra de contrato",
    "Em negociação",
    "Reestruturado",
    "Pari",
    "Persi",
    "Per",
    "Tribunal"
  ];

  const GridItem = ({ label, value }: { label: string; value: string }) => (
    <Grid item xs={6} marginBottom={2}>
      <Typography variant="body1">
        <strong>{label}</strong>: {value}
      </Typography>
    </Grid>
  );

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Visualizar Informações do Contrato
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

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            margin: "40px",
            width: "400px"
          }}
        >
          <Grid item>
            <GridItem label="ID Contrato" value={contractData?.id} />
            <GridItem
              label="Data de suspensão pelo tribunal, da contagem do prazo"
              value={contractData?.courtSuspensionDate}
            />
            <GridItem
              label="Data da suspensão do recurso de tribunal"
              value={contractData?.courtAppealSuspensionDate}
            />
            <GridItem label="Data de reestruturação" value={contractData?.restructuringDate} />
            <GridItem label="Última data de edição" value={contractData?.lastUpdate} />
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ width: "50%", margin: "24px 40px 40px 40px" }}>
          <FormGroup>
            {options.map((option, index) => (
              <FormControlLabel key={index} control={<Checkbox />} label={option} />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Dialog>
  );
};
