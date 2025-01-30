"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Sidebar } from "react-pro-sidebar";

import { MenuItem } from "@/components";
import { IMAGE_LOGO_BIG, IMAGE_LOGO_SMALL } from "@/constants/images";
import PALETTE from "@/styles/_palette";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { ChartLine, Graph, List, UserGear } from "@phosphor-icons/react";

import { useFetchPerfil } from "@/hooks/perfil/useFetchPerfil";
import { useSession } from "next-auth/react";
import { itemmenu, menu, menu__logo } from "./styles";

export const Menu = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("");
  const [perfilId, setPerfilId] = useState<number | null>(null);

  const router = useRouter();
  const { data, status } = useSession(); // Dados da sessão
  const { perfil, loading: loadingPerfil } = useFetchPerfil();

  useEffect(() => {
    const matchEmailWithPerfil = async () => {
      if (status === "authenticated" && data?.user?.email && !loadingPerfil && perfil.length > 0) {
        const userPerfil = perfil.find((p) => p.email === data.user.email); // Compara o email
        if (userPerfil) {
          setPerfilId(userPerfil.perfilId); // Define o perfilId do usuário
        }
      }
    };

    matchEmailWithPerfil();
    setSelected(window.location.pathname || "/gre");
  }, [data, status, perfil, loadingPerfil]);

  const handleNavigation = (path: string) => {
    setSelected(path);
    router.push(path);
  };

  return (
    <Box sx={menu}>
      <Sidebar collapsed={isCollapsed}>
        <MuiMenu>
          <MuiMenuItem style={itemmenu}>
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="10px">
                <Typography
                  variant="h5"
                  color={PALETTE.PRIMARY_MAIN}
                  sx={{ "&:hover": { backgroundColor: "transparent" } }}
                >
                  {data?.user?.name || "Usuário"}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <List size={24} color={PALETTE.PRIMARY_MAIN} weight="bold" />
                </IconButton>
              </Box>
            )}
            {isCollapsed && (
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <List size={24} color={PALETTE.PRIMARY_MAIN} weight="bold" />
              </IconButton>
            )}
          </MuiMenuItem>
          <Box sx={menu__logo}>
            {isCollapsed ? (
              <Image src={IMAGE_LOGO_SMALL} alt="logo-small" width={100} height={40} priority />
            ) : (
              <Image src={IMAGE_LOGO_BIG} alt="logo" width={100} height={40} />
            )}
          </Box>
          <MenuItem
            title="Grupos Económicos"
            to="/gre"
            icon={<Graph size={28} color={PALETTE.PRIMARY_MAIN} />}
            selected={selected === "/gre"}
            setSelected={setSelected}
            onClick={() => handleNavigation("/gre")}
          />
          {/* Se NEXT_PUBLIC_IS_UTP for "true", adiciona a rota de utp */}
          {process.env.NEXT_PUBLIC_IS_UTP === "true" && (
            <MenuItem
              title="Scoring"
              to="/utp"
              icon={<ChartLine size={28} color={PALETTE.PRIMARY_MAIN} />}
              selected={selected === "/utp"}
              setSelected={setSelected}
              onClick={() => handleNavigation("/utp")}
            />
          )}
          {perfilId === 1 ? (
            <MenuItem
              title="BackOffice"
              to="/backoffice"
              icon={<UserGear size={28} color={PALETTE.PRIMARY_MAIN} />}
              selected={selected === "/backoffice"}
              setSelected={setSelected}
              onClick={() => handleNavigation("/backoffice")}
            />
          ) : loadingPerfil ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50px">
              <CircularProgress size={24} />
            </Box>
          ) : null}
        </MuiMenu>
      </Sidebar>
    </Box>
  );
};
