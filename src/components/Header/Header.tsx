"use client";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip
} from "@mui/material";
import { SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import { signOut } from "next-auth/react"; // Importa o signOut do next-auth
import { MouseEvent, useState } from "react";

import { header_boxshadow } from "./styles";

import PALETTE from "@/styles/_palette";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Usa o signOut e redireciona para a página principal
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" />

      <Box display="flex">
        <IconButton onClick={handleClick}>
          <Image src="/assets/icons/flag_pt.svg" alt="PT" width={22} height={18} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={header_boxshadow}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Image src="/assets/icons/flag_pt.svg" alt="PT" width={22} height={18} />
            </ListItemIcon>
            <ListItemText primary="Português" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Image src="/assets/icons/flag_uk.svg" alt="UK" width={22} height={18} />
            </ListItemIcon>
            <ListItemText primary="Inglês" />
          </MenuItem>
        </Menu>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogout}>
            <SignOut size={20} color={PALETTE.PRIMARY_MAIN} weight="bold" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
