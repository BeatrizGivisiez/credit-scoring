"use client";
import { useEffect, useState } from "react";
import { Tabs } from "@/components";
import { BuildingOffice, Graph, Prohibit, UserGear } from "@phosphor-icons/react";

import { ManagerGREPage } from "./manager-gre/ManagerGRE";
import { ManagerUserPage } from "./manager-user/ManagerUser";
import { ManagerEntity } from "./manager-entity/ManagerEntity";
import { ManagerContract } from "./manager-contract/ManagerContract";
import { useFetchPerfil } from "@/hooks/perfil/useFetchPerfil";
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
  }
];

// Se NEXT_PUBLIC_IS_UTP for "true", adiciona as abas extras
if (process.env.NEXT_PUBLIC_IS_UTP === "true") {
  tabs.push(
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
  );
}

export const BackOfficePage = () => {
  const { data, status } = useSession(); // Dados da sessão
  const { perfil, loading: loadingPerfil } = useFetchPerfil(); // Hook para buscar perfis
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [perfilId, setPerfilId] = useState<number | null>(null);

  useEffect(() => {
    const matchEmailWithPerfil = () => {
      if (status === "authenticated" && data?.user?.email && !loadingPerfil && perfil.length > 0) {
        const userPerfil = perfil.find((p) => p.email === data.user.email); // Compara o email
        if (userPerfil) {
          setPerfilId(userPerfil.perfilId); // Define o perfilId do usuário
        }
      }
    };

    matchEmailWithPerfil();

    // Configura um temporizador para exibir a mensagem de acesso negado após 10 segundos
    if (status === "authenticated" && perfilId !== 1) {
      const timer = setTimeout(() => setShowAccessDenied(true), 10000);
      return () => clearTimeout(timer); // Limpa o temporizador ao desmontar o componente
    }
  }, [status, data, perfil, loadingPerfil, perfilId]);

  // Enquanto a sessão está carregando ou os perfis ainda não estão prontos
  if (status === "loading" || loadingPerfil) {
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
  if (status === "authenticated" && perfilId === 1) {
    return <Tabs tabs={tabs} />;
  }

  // Caso não tenha carregado os dados, mantém o carregamento
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
};
