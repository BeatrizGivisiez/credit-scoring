"use client";

import {
  Alert,
  Box,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography
} from "@mui/material";
import { Check, FloppyDiskBack, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { ModalListUserProps } from "./types";

import { optionperfil } from "@/app/_mocks/optiontypes";
import { Button, ButtonIcon, Divider, InputSelect, InputText } from "@/components";
import PALETTE from "@/styles/_palette";

export const ModalCreateUserEdit = ({
  open,
  handleClose,
  userName,
  email,
  password,
  perfil
}: ModalListUserProps) => {
  const [isUserActive, setUserActive] = useState(true); // Estado para controlar o estado do usuário

  const [alertOpen, setAlertOpen] = useState(false); // Estado para o modal de alerta
  const [alertMessage, setAlertMessage] = useState(""); // Mensagem do modal de alerta
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success"); // Tipo de alerta

  const [selectedPerfil, setSelectedPerfil] = useState<string>(perfil || ""); // Garante que seja string
  const [inputUserName, setInputUserName] = useState<string>(userName || ""); // Nome
  const [inputEmail, setInputEmail] = useState<string>(email || ""); // E-mail
  const [inputPassword, setInputPassword] = useState<string>(password || ""); // Senha

  useEffect(() => {
    // Mapear o nome do perfil para o valor correto
    const perfilValue = optionperfil.find((opt) => opt.label === perfil)?.value || "";
    setSelectedPerfil(perfilValue); // Agora, selectedPerfil terá o valor '1', '2' ou '3'

    // Definir a senha
    if (password !== undefined) {
      setInputPassword(password);
    }
  }, [perfil, password]);

  const handleChangeSelect = (newValue: string) => {
    setSelectedPerfil(newValue);
  };

  const handleInputUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUserName(event.target.value);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  // Função para alterar o estado do grupo e exibir a mensagem de alerta
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = event.target.checked;
    setUserActive(isActive);
    if (isActive) {
      setAlertMessage("O utilizador foi ativado com sucesso.");
      setAlertSeverity("success");
    } else {
      setAlertMessage("O utilizador foi desativado com sucesso.");
      setAlertSeverity("error");
    }
    setAlertOpen(true); // Abre o alerta
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Editar - {userName}
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 8,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
          gap: 4
        }}
      >
        <InputText
          id="nome"
          label="Nome"
          value={inputUserName}
          onChange={handleInputUserName} // Função de mudança de senha
          type="text" // Tipo senha para ocultar caracteres
          required // Campo obrigatório
        />
        <InputText
          id="email"
          label="Email"
          value={inputEmail}
          onChange={handleInputEmail} // Função de mudança de senha
          type="email" // Tipo senha para ocultar caracteres
          required // Campo obrigatório
        />
        <FormGroup>
          <FormControlLabel
            label={isUserActive ? "Utilizador Ativo" : "Utilizador Inativo"}
            control={<Switch checked={isUserActive} onChange={handleSwitchChange} />}
          />
        </FormGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 8,
          gap: 4
        }}
      >
        <InputSelect
          fullWidth
          options={optionperfil}
          value={selectedPerfil}
          onChange={handleChangeSelect}
          label="Alterar Perfil?"
        />
        <InputText
          id="password"
          label="Alterar Senha?"
          value={inputPassword}
          onChange={handleInputPassword} // Função de mudança de senha
          type="password" // Tipo senha para ocultar caracteres
          required // Campo obrigatório
        />
      </Box>

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, gap: 2 }}>
        <Button label="Cancelar" color="success" onClick={handleClose} iconEnd={X} />
        <Button label="Gravar" color="success" onClick={() => {}} iconEnd={FloppyDiskBack} />
      </Box>

      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <Alert
          icon={<Check />}
          severity={alertSeverity}
          onClose={() => setAlertOpen(false)}
          sx={{ padding: 2 }}
        >
          {alertMessage}
        </Alert>
      </Dialog>
    </Dialog>
  );
};
