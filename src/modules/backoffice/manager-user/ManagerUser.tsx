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
import { UserCreateDTO, UserDTO } from "@/app/dto/UserDto";
import { useCreateUser } from "@/hooks/user/useCreateUser";

export const ManagerUserPage = () => {
  const { user: fetchedUsers, loading, error, refetch } = useFetchUser();
  const { createUser } = useCreateUser();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [addUser, setAddUser] = useState<UserCreateDTO[]>([]);
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
  const handleAddUser = async (newUser: UserCreateDTO) => {
    try {
      const createdUser = await createUser(newUser); // Salva no backend
      setAddUser((prevUsers) => [...prevUsers, createdUser]); // Adiciona o novo usuário
    } catch (error) {
      console.log("Erro ao criar o utillizador", error);
    } finally {
      handleCloseModal();
      await refetch();
    }
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
            <Alert severity="error" label="Erro ao carregar usuários" icon={WarningCircle} />
          ) : (
            <TableListUser pageSize={10} userList={users} refetch={refetch} />
          )}
        </Card>
      </Box>

      <ModalCreateUser
        open={createUserOpen}
        handleClose={handleCloseModal}
        onSave={handleAddUser}
        users={addUser}
      />
    </>
  );
};
