"use client";

import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import { ModalListGroupProps, RelationData } from "./types";
import { InputDate } from "../Inputs/InputDate/InputDate";

import { Button, ButtonIcon, Divider } from "@/components";
import PALETTE from "@/styles/_palette";
import { EconomicGroupId } from "@/app/dto/EconomicGroupIdDto";

// Configura o Dayjs para usar a localidade pt-BR
dayjs.locale("pt-br");

export const ModalRelateEntityEdit = ({
  open,
  handleClose,
  parentClient,
  nif,
  selectedRelation
}: ModalListGroupProps & { selectedRelation: EconomicGroupId | null }) => {
  const [value, setValue] = useState<Dayjs | null>(null); // Estado para controlar a data de término

  // Verifica se relations está definido e seleciona a primeira relação (ajuste conforme necessário)

  // Se a relação estiver inativa (tem deletedAt), preenche a data de término
  useEffect(() => {
    if (selectedRelation?.deleted) {
      setValue(dayjs(selectedRelation.deleted));
    }
  }, [selectedRelation]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Editar relação
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

      <Box sx={{ margin: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Entidade:
            </Typography>
            <Typography variant="body1">{parentClient}</Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Relação:
            </Typography>
            <Typography variant="body1">
              {selectedRelation?.economicGroupType.name || "N/A"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              NIF:
            </Typography>
            <Typography variant="body1">{nif}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <InputDate
              label="Data Fim:"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              disabled={!!selectedRelation?.deleted}
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, gap: 2 }}>
        <Button label="Cancelar" color="success" onClick={handleClose} iconEnd={X} />
        <Button label="Gravar" color="success" onClick={() => {}} iconEnd={FloppyDiskBack} />
      </Box>
    </Dialog>
  );
};
