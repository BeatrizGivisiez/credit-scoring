"use client";

import { Box, Stack, Typography } from "@mui/material";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";

import { backoffice__box, backoffice__manager } from "../styles";

import { TABLE_USERS } from "@/app/_mocks/tableusers"; // Mock inicial de usuários
import { Breadcrumbs, Button, Card, TableListUser, ModalCreateUser } from "@/components";
import { breadcrumbsBackoffice } from "@/constants/breadcrumbs";
import PALETTE from "@/styles/_palette";
import { User } from "@/types/types";

export const ManagerUserPage = () => {
  const [users, setUsers] = useState<User[]>(TABLE_USERS); // Inicializa com a lista de usuários mockada
  const [createUserOpen, setCreateUserOpen] = useState<boolean>(false); // Estado para controlar a abertura do modal

  // Função para abrir o modal
  const handleOpenCreateUser = () => {
    setCreateUserOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setCreateUserOpen(false);
  };

  // Função para adicionar um novo usuário
  const handleAddUser = (newUser: User) => {
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
          <TableListUser pageSize={10} userList={users} /> {/* Usa a lista de usuários do estado */}
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
