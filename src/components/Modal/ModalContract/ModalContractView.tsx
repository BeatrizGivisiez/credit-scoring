"use client";

import { ButtonIcon, Divider, Button } from "@/components";
import {
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography
} from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import { ModalContractViewProps } from "./types";
import PALETTE from "@/styles/_palette";

export const ModalContractView = ({ open, handleClose, handleSubmit }: ModalContractViewProps) => {
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

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Editar Informações do Contrato
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
          <TextField label="ID_Contrato" variant="outlined" defaultValue="1010" fullWidth />
          <TextField
            label="Data de suspensão pelo tribunal, da contagem do prazo"
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Data da suspensão do recurso de tribunal"
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Data de reestruturação"
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Última data de edição"
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            defaultValue="0001-01-01T00:00"
            fullWidth
          />
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
        <Button label="Gravar" color="success" onClick={handleSubmit} iconEnd={FloppyDiskBack} />
      </Box>
    </Dialog>
  );
};
