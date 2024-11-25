"use client";

import { useEffect, useMemo, useState } from "react";

import { Button, ButtonIcon, Divider, InputSelect, InputText } from "@/components";
import PALETTE from "@/styles/_palette";
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

import { modalcreateuseredit__inputs, modalcreateuseredit__password } from "./styles";
import { ModalListUserProps } from "./types";
import { optionperfil, UserCreateDTO } from "@/app/dto/UserDto";
import { useEditUser, useDisabledUser } from "@/hooks";

export const ModalCreateUserEdit = ({
  open,
  handleClose,
  nome,
  email,
  password,
  perfil,
  id = 0
}: ModalListUserProps) => {
  const [isUserActive, setUserActive] = useState(true); // Estado para controlar o estado do usuário

  const [alertOpen, setAlertOpen] = useState(false); // Estado para o modal de alerta
  const [alertMessage, setAlertMessage] = useState(""); // Mensagem do modal de alerta
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success"); // Tipo de alerta

  const [selectedPerfil, setSelectedPerfil] = useState<string>(perfil || ""); // Garante que seja string
  const [inputUserName, setInputUserName] = useState<string>(nome || ""); // Nome
  const [inputEmail, setInputEmail] = useState<string>(email || ""); // E-mail
  const [inputPassword, setInputPassword] = useState<string>(password || ""); // Senha

  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const { disabledUser, loading, error } = useDisabledUser();

  const buttonDisabled = useMemo<boolean>(() => {
    const result =
      !!inputUserName && !!inputEmail && !!inputPassword && !!selectedPerfil && isUpdated;

    return !result;
  }, [inputUserName, inputEmail, inputPassword, selectedPerfil, isUpdated]);

  const { editUser } = useEditUser();

  useEffect(() => {
    // Mapear o nome do perfil para o valor correto
    const perfilValue = optionperfil.find((opt) => opt.value === perfil)?.value || "";
    setSelectedPerfil(perfilValue.toString()); // Agora, selectedPerfil terá o valor '1', '2' ou '3'

    // Definir a senha
    if (password !== undefined) {
      setInputPassword(password);
    }
  }, [perfil, password]);

  const handleChangeSelect = (newValue: string) => {
    setSelectedPerfil(newValue);
    setIsUpdated(true);
  };

  const handleInputUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUserName(event.target.value);
    setIsUpdated(true);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
    setIsUpdated(true);
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
    setIsUpdated(true);
  };

  // Função para alterar o estado do grupo e exibir a mensagem de alerta
  const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = event.target.checked;
    setUserActive(isActive);

    try {
      if (!id) {
        throw new Error("ID do usuário não está definido.");
      }

      await disabledUser(id); // Passa o ID aqui

      if (isActive) {
        setAlertMessage("O utilizador foi ativado com sucesso.");
        setAlertSeverity("success");
      } else {
        setAlertMessage("O utilizador foi desativado com sucesso.");
        setAlertSeverity("error");
      }
    } catch (err) {
      console.error("Erro ao alterar o estado do utilizador:", err);
      setAlertMessage("Erro ao alterar o estado do utilizador. Tente novamente.");
      setAlertSeverity("error");
    }
    setAlertOpen(true);
  };

  const handleEditUser = async () => {
    const userData: UserCreateDTO = {
      nome: inputUserName,
      email: inputEmail,
      password: inputPassword,
      perfilId: Number.parseInt(selectedPerfil)
    };
    await editUser(userData, id);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Editar Utilizador - {nome}
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

      <Box sx={modalcreateuseredit__inputs}>
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
            control={
              <Switch checked={isUserActive} onChange={handleSwitchChange} disabled={loading} />
            }
          />
        </FormGroup>
      </Box>
      <Box sx={modalcreateuseredit__password}>
        <InputSelect
          fullWidth
          options={optionperfil}
          value={selectedPerfil}
          onChange={(value) => handleChangeSelect(value.toString())}
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
        <Button
          label="Gravar"
          color="success"
          onClick={handleEditUser}
          iconEnd={FloppyDiskBack}
          disabled={buttonDisabled}
        />
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
