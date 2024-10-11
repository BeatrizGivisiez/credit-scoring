import { Box } from "@mui/material";

import { breadcrumb__children, breadcrumb__main, layoutdefault__box } from "./styles";

import { Header, Menu } from "@/components";

interface LayoutDefaultProps {
  children: React.ReactNode;
}

export const LayoutDefault = ({ children }: LayoutDefaultProps) => {
  return (
    <Box sx={layoutdefault__box}>
      <Menu />
      <Box component="main" sx={breadcrumb__main}>
        <Header />
        <Box component="main" sx={breadcrumb__children}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
