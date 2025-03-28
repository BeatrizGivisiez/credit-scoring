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

import { homegre__box, homegre__graphs } from "./styles";
import { HomeGREPageProps } from "./types";
import { useFetchTotalEconomicGroup, useFetchTotalEntity } from "@/hooks";

export const HomeGREPage = ({ isConsult, setIsConsult }: HomeGREPageProps) => {
  const { totalEntity, loading, error } = useFetchTotalEntity();
  const { totalEconomicGroup, loading: loadingEG, error: errorEG } = useFetchTotalEconomicGroup();
  const handleToggleConsult = () => setIsConsult(!isConsult);
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
          <Alert severity="error" label="Erro ao carregar entidades" icon={WarningCircle} />
        ) : (
          <CardInfo icon={BuildingOffice} title={totalEntity} subTitle="Total de Entidades" />
        )}

        {loadingEG ? (
          <Loading />
        ) : errorEG ? (
          <Alert severity="error" label="Erro ao carregar entidades" icon={WarningCircle} />
        ) : (
          <CardInfo icon={Graph} title={totalEconomicGroup} subTitle="Todal de Grupos Económico" />
        )}
      </Box>

      <Box sx={homegre__graphs}>
        <ChartBarRelation title="Top 5 maiores Grupos Económicos" height={580} width={645} />
        <ChartBarCreation title="Grupos Económicos criado por Trimestre" height={580} width={645} />
      </Box>
    </>
  );
};
