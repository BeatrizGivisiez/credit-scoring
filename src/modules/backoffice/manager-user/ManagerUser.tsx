"use client";

import { Box, Stack, Typography } from "@mui/material";
import { Plus, WarningCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { backoffice__box, backoffice__manager } from "./styles";

import {
  Alert,
  Breadcrumbs,
  Button,
  Card,
  TableListUser,
  ModalCreateUser,
  Loading
} from "@/components";
import { breadcrumbsBackoffice } from "@/constants/breadcrumbs";
import PALETTE from "@/styles/_palette";
import { useFetchUser } from "@/hooks";
import { UserDTO } from "@/app/dto/UserDto";

export const ManagerUserPage = () => {
  const { user: fetchedUsers, loading, error } = useFetchUser();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [createUserOpen, setCreateUserOpen] = useState<boolean>(false);

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);

  // Função para abrir o modal
  const handleOpenCreateUser = () => {
    setCreateUserOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setCreateUserOpen(false);
  };

  // Função para adicionar um novo usuário
  const handleAddUser = (newUser: UserDTO) => {
    const userWithStatus = {
      ...newUser,
      status: true // Define como ativo por padrão
    };

    setUsers((prevUsers) => [...prevUsers, userWithStatus]); // Adiciona o novo usuário
    handleCloseModal(); // Fecha o modal após adicionar o usuário
  };

  return (
    <>
      <Box sx={backoffice__box}>
        <Stack sx={backoffice__manager}>
          <Breadcrumbs breadcrumbs={breadcrumbsBackoffice} />
          <Button iconEnd={Plus} onClick={handleOpenCreateUser} label={"Criar Utilizador"} />
        </Stack>
        <Card>
          <Typography variant="h6" mb={2} color={PALETTE.PRIMARY_MAIN}>
            Lista de Utilizadores
          </Typography>
          {loading ? (
            <Loading />
          ) : error ? (
            <Alert severity="error" label="Erro ao carregar usuários" icon={WarningCircle}></Alert> // Exibe erro, se houver
          ) : (
            <TableListUser pageSize={10} userList={users} /> // Usa a lista de usuários carregada
          )}
        </Card>
      </Box>

      {/* Passa a função handleAddUser para o modal */}
      <ModalCreateUser
        open={createUserOpen}
        handleClose={handleCloseModal}
        onSave={handleAddUser}
        users={users}
      />
    </>
  );
};
