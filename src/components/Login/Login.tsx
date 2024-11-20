"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert, Button, Card, InputText } from "@/components";
import { IMAGE_LOGO_BIG } from "@/constants/images";
import PALETTE from "@/styles/_palette";
import { Box } from "@mui/material";
import { LockKey, User, WarningCircle } from "@phosphor-icons/react";

import { login__box, login__card, login__input } from "./styles";

export const Login = () => {
  // const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Função para capturar o evento de pressionar Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin(); // Chama a função de login ao pressionar Enter
    }
  };

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/gre" // Redireciona para a rota protegida
    });
    if (result?.error) {
      setError(result.error === "CredentialsSignin" ? "E-mail ou senha incorretos." : result.error);
      setAlertOpen(true);
    } else if (result?.ok) {
      router.push(result.url || "/gre"); // Redireciona para a rota correta após login
    }
  };

  return (
    <Box sx={login__box}>
      <Card>
        <Box sx={login__card}>
          <Image src={IMAGE_LOGO_BIG} alt="logo" width={150} height={50} />
          <Box sx={login__input}>
            <User size={36} color={PALETTE.PRIMARY_MAIN} />
            <InputText
              id="email"
              label="E-mail"
              value={username}
              onChange={handleEmail}
              type="email"
              required
            />
          </Box>
          <Box sx={login__input}>
            <LockKey size={36} color={PALETTE.PRIMARY_MAIN} />
            <InputText
              id="password"
              label="Senha"
              value={password}
              onChange={handlePassword}
              onKeyDown={handleKeyDown}
              type="password"
              required
            />
          </Box>
          {error && alertOpen && (
            <Alert
              icon={WarningCircle}
              severity="error"
              onClose={() => setAlertOpen(false)}
              label={error}
            ></Alert>
          )}
          <Button label="Entrar" onClick={handleLogin} />
        </Box>
      </Card>
    </Box>
  );
};
