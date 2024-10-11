import { Box } from "@mui/material";

import PALETTE from "@/styles/_palette";

interface LayoutLoginProps {
  children: React.ReactNode;
}
export const LayoutLogin = ({ children }: LayoutLoginProps) => {
  return (
    <Box
      sx={{
        display: "flex", // Define o layout como flexbox
        justifyContent: "center", // Centraliza horizontalmente
        alignItems: "center", // Centraliza verticalmente
        minHeight: "100vh", // Garante que o Box ocupe 100% da altura da viewport
        padding: 2, // Adiciona padding para espaçamento
        backgroundColor: PALETTE.SECONDARY_MAIN
      }}
    >
      {children}
    </Box>
  );
};
