"use client";

import dayjs, { Dayjs } from "dayjs";

import { Button, ButtonIcon, Divider, GridItem, InputDate } from "@/components";
import PALETTE from "@/styles/_palette";
import {
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Typography
} from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import { useState } from "react";
import { ModalContractEditProps } from "./types";
dayjs.locale("pt-br");

export const ModalContractEdit = ({ open, handleClose, handleSubmit }: ModalContractEditProps) => {
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

  // Estados para gerenciar os valores das datas
  const [suspensionDate, setSuspensionDate] = useState<Dayjs | null>(null);
  const [courtSuspensionDate, setCourtSuspensionDate] = useState<Dayjs | null>(null);
  const [restructuringDate, setRestructuringDate] = useState<Dayjs | null>(null);

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
            margin: "40px",
            width: "400px"
          }}
        >
          <GridItem label="ID Contrato" value={"1010"} />
          <GridItem label="Última data de edição" value={"2024-12-20 09:45"} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginTop: "24px"
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <InputDate
                label="Data de suspensão pelo tribunal, da contagem do prazo"
                value={suspensionDate}
                onChange={setSuspensionDate}
              />
            </Box>
            <InputDate
              label="Data da suspensão do recurso de tribunal"
              value={courtSuspensionDate}
              onChange={setCourtSuspensionDate}
            />
            <InputDate
              label="Data de reestruturação"
              value={restructuringDate}
              onChange={setRestructuringDate}
            />
            {/* <TextField
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
            /> */}
          </Box>
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
