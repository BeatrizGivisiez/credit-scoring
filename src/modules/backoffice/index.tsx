"use client";
import { useEffect, useState } from "react";
import { Tabs } from "@/components";
import { BuildingOffice, Graph, Prohibit, UserGear } from "@phosphor-icons/react";

import { ManagerGREPage } from "./manager-gre/ManagerGRE";
import { ManagerUserPage } from "./manager-user/ManagerUser";
import { ManagerEntity } from "./manager-entity/ManagerEntity";
import { ManagerContract } from "./manager-contract/ManagerContract";
import { useSession } from "next-auth/react";
import { Box, CircularProgress, Typography } from "@mui/material";
import PALETTE from "@/styles/_palette";

const tabs = [
  {
    value: 0,
    label: "Gestão de Utilizadores",
    iconStart: UserGear,
    content: <ManagerUserPage />
  },
  {
    value: 1,
    label: "Gestão da Característica Relação",
    iconStart: Graph,
    content: <ManagerGREPage />
  },
  {
    value: 2,
    label: "Gestão da Característica Entidades",
    iconStart: BuildingOffice,
    content: <ManagerEntity />
  },
  {
    value: 3,
    label: "Gestão da Característica Contratos",
    iconStart: BuildingOffice,
    content: <ManagerContract />
  }
];

export const BackOfficePage = () => {
  const { data, status } = useSession();
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [cachedPerfilId, setCachedPerfilId] = useState<number | null>(null);

  useEffect(() => {
    // Cache o perfilId assim que os dados da sessão estiverem disponíveis
    if (status === "authenticated" && data?.user?.perfilId !== undefined) {
      setCachedPerfilId(data.user.perfilId);
      localStorage.setItem("perfilId", data.user.perfilId.toString());
    } else {
      // Carrega o perfilId do cache, se disponível
      const storedPerfilId = localStorage.getItem("perfilId");
      if (storedPerfilId) {
        setCachedPerfilId(parseInt(storedPerfilId, 10));
      }
    }

    // Configura um temporizador para exibir a mensagem de acesso negado após 10 segundos
    if (status === "authenticated" && data?.user?.perfilId !== 1) {
      const timer = setTimeout(() => setShowAccessDenied(true), 10000);
      return () => clearTimeout(timer); // Limpa o temporizador ao desmontar o componente
    }
  }, [status, data]);

  // Enquanto a sessão está carregando ou dados não estão prontos, exibe o carregamento
  if (status === "loading" || (!cachedPerfilId && !showAccessDenied)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Exibe mensagem de acesso negado após 10 segundos, se o perfilId não for 1
  if (showAccessDenied) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" gap="16px">
        <Prohibit size={64} color={PALETTE.PRIMARY_MAIN} />
        <Typography variant="h4" color={PALETTE.PRIMARY_MAIN}>
          No momento, você não tem permissão para acessar!
        </Typography>
      </Box>
    );
  }

  // Renderiza as abas apenas quando a autenticação e as permissões são confirmadas
  if (status === "authenticated" && cachedPerfilId === 1) {
    return <Tabs tabs={tabs} />;
  }

  // Caso não tenha carregado os dados, mantém o carregamento
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
};
