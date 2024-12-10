"use client";

import { Alert, Button, CardInfo, ChartBarCreation, ChartBarRelation, Loading } from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, Stack, Typography } from "@mui/material";
import {
  ArrowLeft,
  BuildingOffice,
  Graph,
  MagnifyingGlass,
  WarningCircle
} from "@phosphor-icons/react";

import { useFetchTotalEntity } from "@/hooks";
import { homegre__box, homegre__graphs } from "./styles";
import { HomeGREPageProps } from "./types";

export const HomeGREPage = ({ isConsult, setIsConsult }: HomeGREPageProps) => {
  const { totalEntity, loading, error } = useFetchTotalEntity();
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
        {loading ? (
          <Loading />
        ) : error ? (
          <Alert severity="error" label="Erro ao carregar usuários" icon={WarningCircle} />
        ) : (
          <CardInfo icon={BuildingOffice} title={totalEntity} subTitle="Total de Entidades" />
        )}

        <CardInfo icon={Graph} title="15" subTitle="Todal de Grupos Económicos" />
      </Box>

      <Box sx={homegre__graphs}>
        <ChartBarRelation title="Top 5 maiores Grupos Económicos" height={450} width={645} />
        <ChartBarCreation title="Grupos Económicos criado por trimestre" height={450} width={645} />
      </Box>
    </>
  );
};
