"use client";

import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import { FloppyDiskBack, X } from "@phosphor-icons/react";
import { useState } from "react";

import { ModalCreateUserProps } from "./types";
import { optionperfil } from "@/app/_mocks/optiontypes";
import { Button, ButtonIcon, Divider, InputSelect, InputText } from "@/components";
import PALETTE from "@/styles/_palette";
import { useCreateUser } from "@/hooks/user/useCreateUser";

export const ModalCreateUser = ({
  open,
  handleClose,
  onSave
}: ModalCreateUserProps & { onSave: (user: any) => void }) => {
  const [selectedPerfil, setSelectedPerfil] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>(""); // Email
  const [inputPassword, setInputPassword] = useState<string>(""); // Senha

  const { createUser, loading, error } = useCreateUser();

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

  const handleSave = async () => {
    const newUser = {
      nome: inputName,
      email: inputEmail,
      password: inputPassword,
      perfilId: Number(selectedPerfil)
    };
    try {
      const createdUser = await createUser(newUser); // Chama o hook para criar o usuário
      if (createdUser) {
        onSave(createdUser); // Passa o usuário criado para o componente pai
        handleClose(); // Fecha o modal
      }
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
    }
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
