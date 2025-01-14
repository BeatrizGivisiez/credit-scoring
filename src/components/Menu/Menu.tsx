"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Sidebar } from "react-pro-sidebar";

import { MenuItem } from "@/components";
import { IMAGE_LOGO_BIG, IMAGE_LOGO_SMALL } from "@/constants/images";
import PALETTE from "@/styles/_palette";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { Graph, List, UserGear } from "@phosphor-icons/react";

import { itemmenu, menu, menu__logo } from "./styles";
import { useSession } from "next-auth/react";

export const Menu = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("");
  const [loadingBackOffice, setLoadingBackOffice] = useState(true); // Estado para o item BackOffice
  const [cachedPerfilId, setCachedPerfilId] = useState<number | null>(null);

  const router = useRouter();
  const { data, status } = useSession();

  console.log("Id perfil", data?.user?.perfilId);

  useEffect(() => {
    // Define a rota atual ao carregar
    setSelected(window.location.pathname || "/gre");

    // Cache o perfilId assim que os dados da sessão estiverem disponíveis
    if (status === "authenticated" && data?.user?.perfilId !== undefined) {
      setCachedPerfilId(data.user.perfilId);
      localStorage.setItem("perfilId", data.user.perfilId.toString());
      setLoadingBackOffice(false); // Já temos os dados, não precisa carregar mais
    } else {
      // Carrega o perfilId do cache, se disponível
      const storedPerfilId = localStorage.getItem("perfilId");
      if (storedPerfilId) {
        setCachedPerfilId(parseInt(storedPerfilId, 10));
        setLoadingBackOffice(false); // Dados carregados do cache
      } else if (status === "unauthenticated") {
        setLoadingBackOffice(false); // Usuário não autenticado, sem necessidade de carregamento
      }
    }
  }, [data, status]);

  const handleNavigation = (path: string) => {
    setSelected(path); // Atualiza o estado do item selecionado
    router.push(path); // Navega para a rota desejada
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
                  {data?.user?.name}
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
            selected={selected === "/gre"} // Verifica a rota atual
            setSelected={setSelected} // Passa a função setSelected corretamente
            onClick={() => handleNavigation("/gre")} // Navega
          />
          {/* <MenuItem
            title="Scoring"
            to="/utp"
            icon={<ChartLine size={28} color={PALETTE.PRIMARY_MAIN} />}
            selected={selected === "/utp"} // Verifica a rota atual é "/"
            setSelected={setSelected} // Passa a função setSelected corretamente
            onClick={() => handleNavigation("/utp")} // Navega
          /> */}
          {cachedPerfilId === 1 &&
            (loadingBackOffice ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="50px">
                <CircularProgress size={24} />
              </Box>
            ) : (
              <MenuItem
                title="BackOffice"
                to="/backoffice"
                icon={<UserGear size={28} color={PALETTE.PRIMARY_MAIN} />}
                selected={selected === "/backoffice"} // Verifica a rota atual
                setSelected={setSelected} // Passa a função setSelected corretamente
                onClick={() => handleNavigation("/backoffice")} // Navega
              />
            ))}
        </MuiMenu>
      </Sidebar>
    </Box>
  );
};
