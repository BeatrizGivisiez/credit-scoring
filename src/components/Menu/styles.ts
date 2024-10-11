import { SxProps } from "@mui/material";

import PALETTE from "@/styles/_palette";

export const menu: SxProps = {
  display: "flex",
  height: "100vh",
  paddingLeft: "0%",
  "& .ps-sidebar-container": {
    backgroundColor: PALETTE.WHITE,
    "&.hover": {
      backgroundColor: PALETTE.PRIMARY_MAIN
    }
  }
};
export const menu__logo: SxProps = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "32px"
};

export const itemmenu = {
  margin: "10px 0 20px",
  "&:hover": {
    backgroundColor: "transparent", // desativa o fundo no hover
    color: "inherit" // mantém a cor sem alteração
  },
  "&.Mui-selected": {
    backgroundColor: "transparent",
    color: PALETTE.PRIMARY_MAIN
  },
  "&.ps-menu-button:hover": {
    backgroundColor: "transparent"
  }
};

export const menuitem__mui = {
  borderRadius: "8px",
  margin: "10px",
  paddingLeft: "10px",
  transition: "background-color 0.3s ease"
};
