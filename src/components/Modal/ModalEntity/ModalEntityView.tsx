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
import { ModalEntityViewProps } from "./types";
import PALETTE from "@/styles/_palette";

export const ModalEntityView = ({ open, handleClose, entityData }: ModalEntityViewProps) => {
  const options = [
    "Falha da principal fonte de receita",
    "Dúvidas de capacidade de pagamento",
    "Alavancagem Excessiva",
    "Quebra de convênios",
    "Execução de garantia",
    "Quebra de contrato (Particulares e ENIS)",
    "Quebra de contrato (Empresas)",
    "Situação financeira",
    "Fraude",
    "Interveniente em processo judicial",
    "Instituição pública",
    "ER",
    "Garantia usada para pagamento de dívida",
    "Mercado em Crise",
    "Situação de dificuldades financeiras"
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
          Visualizar Informações da Entidade
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
        <Box sx={{ width: "50%", margin: 5 }}>
          <Grid item>
            <GridItem label="ID Entidade" value={entityData?.id} />
            <GridItem label="NIF" value={entityData?.nif} />
            <GridItem label="Tipo de documento" value={entityData?.documentType} />
            <GridItem label="Segmento de cliente" value={entityData?.clientSegment} />
            <GridItem label="Localidade" value={entityData?.location} />
            <GridItem label="Dívidas à Segurança Social" value={entityData?.socialDebt} />
            <GridItem
              label="Tipo de Dificuldades Financeiras"
              value={entityData?.financialDifficulty}
            />
            <GridItem label="Comentários" value={entityData?.comments} />
            <GridItem label="Última data de edição" value={entityData?.lastUpdate} />
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
