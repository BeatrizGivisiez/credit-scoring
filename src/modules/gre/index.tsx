"use client";

import { useCallback, useEffect, useState } from "react";
import { breadcrumbsGREConsult } from "@/constants/breadcrumbs";
import { Box } from "@mui/material";
import { ConsultGREPage } from "./consult-gre/ConsultGRE";
import { CreateGREPage } from "./create-gre/CreateGRE";
import { HomeGREPage } from "./home-gre/HomeGRE";
import { economicgroup__box } from "./styles";
import { useEconomicGroup } from "@/app/context";

export const EconomicGroupsPage = () => {
  const { economicGroup, loading, error } = useEconomicGroup();

  const [currentMode, setCurrentMode] = useState<"home" | "consult" | "create">("home");
  const [filteredGroups, setFilteredGroups] = useState(economicGroup);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | null>(null);

  useEffect(() => {
    if (economicGroup.length > 0) {
      setFilteredGroups(economicGroup);
    }
  }, [economicGroup]);

  const handleSearch = useCallback(
    (query: string) => {
      console.log("Pesquisa:", query); // Log para verificar o valor da pesquisa

      if (query.trim() === "") {
        setFilteredGroups(economicGroup);
        console.log("Grupos filtrados (sem filtro):", economicGroup);
      } else {
        const lowercasedQuery = query.toLowerCase();
        const filtered = economicGroup.filter(
          // NOME DO GRUPO, NOME ENTIDADE MAE E FILHA, NIF MAE E FILHA
          (group: any) =>
            group.name.toLowerCase().includes(lowercasedQuery) ||
            group.entityMotherName.toLowerCase().includes(lowercasedQuery) ||
            group.entityMotherNIF.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredGroups(filtered);
      }
    },
    [economicGroup]
  );

  const handleOpenModal = useCallback((group: any, mode: "view" | "edit") => {
    setSelectedGroup(group);
    setModalMode(mode);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalMode(null);
    setSelectedGroup(null);
  }, []);

  return (
    <Box sx={economicgroup__box}>
      {currentMode === "create" ? (
        <CreateGREPage
          setIsCreatingGroup={() => setCurrentMode("home")}
          setIsConsult={() => setCurrentMode("consult")}
        />
      ) : currentMode === "consult" ? (
        <ConsultGREPage
          isConsult={currentMode === "consult"}
          setIsConsult={() => setCurrentMode("consult")}
          handleSearch={handleSearch}
          filteredGroups={filteredGroups}
          setIsCreatingGroup={() => setCurrentMode("create")}
          handleOpenModalView={(group) => handleOpenModal(group, "view")}
          handleOpenModalEdit={(group) => handleOpenModal(group, "edit")}
          modalMode={modalMode}
          selectedGroup={selectedGroup}
          handleCloseModal={handleCloseModal}
          breadcrumbsGREConsult={breadcrumbsGREConsult}
          loading={loading}
          error={error}
        />
      ) : (
        <HomeGREPage isConsult={true} setIsConsult={() => setCurrentMode("consult")} />
      )}
    </Box>
  );
};
