"use client";

import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import { useState } from "react";

import { ModalCreateUserProps } from "./types";
import { optionperfil } from "@/app/_mocks/optiontypes";
import { Button, ButtonIcon, Divider, InputSelect, InputText } from "@/components";
import PALETTE from "@/styles/_palette";

export const ModalCreateUser = ({
  open,
  handleClose,
  onSave,
  users
}: ModalCreateUserProps & { onSave: (user: any) => void }) => {
  const [selectedPerfil, setSelectedPerfil] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>(""); // Email
  const [inputPassword, setInputPassword] = useState<string>(""); // Senha

  const handleChangeSelect = (newValue: string) => {
    setSelectedPerfil(newValue);
  };

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  const handleSave = () => {
    const lastUserId = Math.max(...users.map((user) => Number(user.id))); // Calcula o maior ID atual
    const newUser = {
      id: (lastUserId + 1).toString(), // Incrementa o ID
      userName: inputName,
      email: inputEmail,
      password: inputPassword,
      perfil: selectedPerfil,
      status: true
    };
    onSave(newUser); // Salva o novo usuário
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Criar novo utilizador
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

      <Box sx={{ display: "flex", flexDirection: "column", marginX: 5, marginY: 8, gap: 4 }}>
        <InputText
          id="nome-utilizador"
          label="Nome do utilizador"
          value={inputName}
          onChange={handleInputName}
          type="text"
          required
        />
        <InputText
          id="email"
          label="E-mail"
          value={inputEmail}
          onChange={handleInputEmail}
          type="email"
          required
        />
        <InputText
          id="password"
          label="Senha"
          value={inputPassword}
          onChange={handleInputPassword}
          type="password"
          required
        />
        <InputSelect
          options={optionperfil}
          value={selectedPerfil}
          onChange={(value) => handleChangeSelect(value.toString())}
          label="Selecione o nível do Perfil"
        />
      </Box>

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, gap: 2 }}>
        <Button label="Cancelar" color="success" onClick={handleClose} iconEnd={X} />
        <Button label="Gravar" color="success" onClick={handleSave} iconEnd={FloppyDiskBack} />
      </Box>
    </Dialog>
  );
};
