"use client";

import { useCallback, useEffect, useState } from "react";

import { useEconomicGroup } from "@/app/context";
import { breadcrumbsGREConsult } from "@/constants/breadcrumbs";
import { Box } from "@mui/material";

import { ConsultGREPage } from "./consult-gre/ConsultGRE";
import { CreateGREPage } from "./create-gre/CreateGRE";
import { HomeGREPage } from "./home-gre/HomeGRE";
import { economicgroup__box } from "./styles";

export const EconomicGroupsPage = () => {
  const { economicGroup, loading, error, fetchEconomicGroup } = useEconomicGroup();
  const [isConsult, setIsConsult] = useState(true);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState(economicGroup);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | null>(null);

  useEffect(() => {
    // console.log("useEffect chamado com economicGroup:", economicGroup); // Verifique se o efeito está sendo chamado
    if (economicGroup.length > 0) {
      setFilteredGroups(economicGroup);
      // console.log("Dados filtrados atualizados:", economicGroup); // Verifique se os dados filtrados estão corretos
    }
  }, [economicGroup]);

  const handleSearch = useCallback(
    (query: string) => {
      // console.log("Pesquisa:", query); // Log para verificar o valor da pesquisa

      if (query.trim() === "") {
        setFilteredGroups(economicGroup);
        // console.log("Grupos filtrados (sem filtro):", economicGroup);
      } else {
        const lowercasedQuery = query.toLowerCase();
        const filtered = economicGroup.filter((group: any) => {
          // Verifica se a pesquisa corresponde ao nome do grupo, entidade mãe ou NIF da entidade mãe
          const matchesGroupDetails =
            group.name.toLowerCase().includes(lowercasedQuery) ||
            group.entityMotherName.toLowerCase().includes(lowercasedQuery) ||
            group.entityMotherNIF.toLowerCase().includes(lowercasedQuery);

          // Verifica se a pesquisa corresponde a algum dos relacionamentos (entityName ou entityNIF)
          const matchesRelationships = group.listRelationships.some((relationship: any) => {
            return (
              relationship.entityName.toLowerCase().includes(lowercasedQuery) ||
              relationship.entityNIF.toLowerCase().includes(lowercasedQuery)
            );
          });

          // Retorna true se a pesquisa corresponder a qualquer campo relevante
          return matchesGroupDetails || matchesRelationships;
        });

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
      {isCreatingGroup ? (
        <CreateGREPage
          setIsCreatingGroup={setIsCreatingGroup}
          setIsConsult={setIsConsult}
          isConsult={isConsult}
        />
      ) : (
        <>
          {isConsult ? (
            <HomeGREPage isConsult={isConsult} setIsConsult={setIsConsult} />
          ) : (
            <ConsultGREPage
              isConsult={isConsult}
              setIsConsult={setIsConsult}
              handleSearch={handleSearch}
              filteredGroups={filteredGroups}
              setIsCreatingGroup={setIsCreatingGroup}
              handleOpenModalView={(group) => handleOpenModal(group, "view")}
              handleOpenModalEdit={(group) => handleOpenModal(group, "edit")}
              modalMode={modalMode}
              selectedGroup={selectedGroup}
              handleCloseModal={handleCloseModal}
              breadcrumbsGREConsult={breadcrumbsGREConsult}
              loading={loading}
              error={error}
              fetchEconomicGroup={fetchEconomicGroup}
            />
          )}
        </>
      )}
    </Box>
  );
};
