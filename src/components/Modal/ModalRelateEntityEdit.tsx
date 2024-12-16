"use client";

import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import { Button, ButtonIcon, Divider } from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";

import { InputDate } from "../Inputs/InputDate/InputDate";
import { ModalRelateEntityEditProps } from "./types";

dayjs.locale("pt-br");

export const ModalRelateEntityEdit = ({
  open,
  handleClose,
  parentClient,
  nif,
  selectedRelation,
  handleSubmit = () => {}
}: ModalRelateEntityEditProps) => {
  const [value, setValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (selectedRelation?.deleted) {
      setValue(dayjs(selectedRelation.deleted));
    }
  }, [selectedRelation]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Inativar Relação
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
              value={value} // Espera um valor do tipo Dayjs | null
              onChange={(newValue) => {
                setValue(newValue); // Armazena Dayjs no estado
                if (newValue) {
                  const formattedDate = newValue.format("YYYY-MM-DD"); // Converte para o formato desejado
                  console.log("Data formatada:", formattedDate); // Use conforme necessário
                }
              }}
              disabled={!!selectedRelation?.deleted}
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, gap: 2 }}>
        <Button label="Cancelar" color="success" onClick={handleClose} iconEnd={X} />
        <Button
          label="Gravar"
          color="success"
          onClick={() => {
            handleSubmit({
              economicGroupRelationshipId: selectedRelation?.economicGroupRelationshipId,
              deletedAt: value
            });
          }}
          iconEnd={FloppyDiskBack}
        />
      </Box>
    </Dialog>
  );
};
