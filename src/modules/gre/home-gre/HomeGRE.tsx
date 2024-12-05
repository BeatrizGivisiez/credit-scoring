"use client";

import { Button, CardInfo, ChartBarCreation, ChartBarRelation } from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, Stack, Typography } from "@mui/material";
import { ArrowLeft, Graph, MagnifyingGlass, UsersThree } from "@phosphor-icons/react";

import { homegre__box, homegre__graphs } from "./styles";
import { HomeGREPageProps } from "./types";
import { useFetchTotalEntity } from "@/hooks";

export const HomeGREPage = ({ isConsult, setIsConsult }: HomeGREPageProps) => {
  const { totalEntity } = useFetchTotalEntity();
  const handleToggleConsult = () => setIsConsult(!isConsult);
  console.log("Passou", totalEntity);
  return (
    <>
      <Stack sx={homegre__box}>
        <Typography variant="h5" color={PALETTE.PRIMARY_MAIN}>
          Grupos Económicos
        </Typography>
        <Button
          iconEnd={isConsult ? MagnifyingGlass : undefined}
          iconStart={!isConsult ? ArrowLeft : undefined}
          onClick={handleToggleConsult}
          label={isConsult ? "Consultar" : "Voltar"}
        />
      </Stack>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
        <CardInfo icon={UsersThree} title={totalEntity} subTitle="Clientes" />
        <CardInfo icon={Graph} title="15" subTitle="Grupos Económicos" />
      </Box>

      <Box sx={homegre__graphs}>
        <ChartBarRelation title="Top 5 maiores Grupos Económicos" height={450} width={645} />
        <ChartBarCreation title="Grupos Económicos criado por trimestre" height={450} width={645} />
      </Box>
    </>
  );
};
