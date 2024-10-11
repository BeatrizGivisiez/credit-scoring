"use client";

import { Typography } from "@mui/material";
import { MenuItem as MuiMenuItem } from "react-pro-sidebar";

import { menuitem__mui } from "./styles";

import PALETTE from "@/styles/_palette";

export const MenuItem = ({ title, to, icon, selected, setSelected }: any) => {
  const isActive = selected;

  return (
    <MuiMenuItem
      active={isActive}
      style={{
        ...menuitem__mui,
        color: isActive ? PALETTE.PRIMARY_MAIN : PALETTE.PRIMARY_DARK,
        backgroundColor: isActive ? "#e3f2fd" : "transparent"
      }}
      onClick={() => setSelected(to)}
      icon={icon}
      href={to}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "#bbdefb";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      <Typography>{title}</Typography>
    </MuiMenuItem>
  );
};
