"use client";

import { Button, ButtonIcon, Divider } from "@/components";
import {
  Alert,
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { Check, FloppyDiskBack, X } from "@phosphor-icons/react";
import { ModalEntityEditProps } from "./types";
import PALETTE from "@/styles/_palette";
import { useState } from "react";

export const ModalEntityEdit = ({ open, handleClose, entityData }: ModalEntityEditProps) => {
  const [alertOpen, setAlertOpen] = useState(false); // Estado para o modal de alerta

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
          Editar Informações da Entidade
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
            <GridItem label="Última data de edição" value={entityData?.lastUpdate} />
            <TextField
              label="Dívidas à Segurança Social"
              variant="outlined"
              value={entityData?.socialDebt || ""}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tipo de Dificuldades Financeiras"
              variant="outlined"
              value={entityData?.financialDifficulty || ""}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Comentários"
              variant="outlined"
              value={entityData?.comments || ""}
              fullWidth
              margin="normal"
            />
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

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, gap: 2 }}>
        <Button label="Cancelar" color="success" onClick={handleClose} iconEnd={X} />
        <Button
          label="Gravar"
          color="success"
          // onClick={handleEditUser}
          iconEnd={FloppyDiskBack}
          // disabled={buttonDisabled}
        />
      </Box>

      <Dialog
        open={alertOpen}
        // onClose={() => setAlertOpen(false)}
      >
        <Alert
          icon={<Check />}
          // severity={alertSeverity}
          // onClose={() => setAlertOpen(false)}
          sx={{ padding: 2 }}
        >
          {/* {alertMessage} */}
        </Alert>
      </Dialog>
    </Dialog>
  );
};
