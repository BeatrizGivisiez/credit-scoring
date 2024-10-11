"use client";

import { useCallback, useEffect, useState } from "react";

import { RELATION_ENTITY } from "@/app/_mocks/relationentity";
import { breadcrumbsGREConsult } from "@/constants/breadcrumbs";
import { Box } from "@mui/material";

import { ConsultGREPage } from "./consult-gre/ConsultGRE";
import { CreateGREPage } from "./create-gre/CreateGRE";
import { economicgroup__box } from "./styles";
import { HomeGREPage } from "./home-gre/HomeGRE";
import useFetchEconomicGroup from "@/hooks/useFetchEconomicGroup";

export const EconomicGroupsPage = () => {
  const { fetchEconomicGroup, economicGroup, loading, error, totalItens } = useFetchEconomicGroup();

  const [isConsult, setIsConsult] = useState(true);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState(economicGroup);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [modalOpenView, setModalOpenView] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Função para alterar o número de itens por página
  const handleSetItemsPerPage = (newItemsPerPage: number) => {
    if (newItemsPerPage !== itemsPerPage) {
      setItemsPerPage(newItemsPerPage);
    }
  };

  useEffect(() => {
    if (economicGroup.length > 0) {
      setFilteredGroups(economicGroup);
    }
  }, [economicGroup]);

  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim() === "") {
        setFilteredGroups(economicGroup);
      } else {
        const lowercasedQuery = query.toLowerCase();
        const filtered = economicGroup.filter(
          (group: any) =>
            group.parentDetails.nmReduzido.toLowerCase().includes(lowercasedQuery) ||
            group.parentDetails.docId.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredGroups(filtered);
      }
    },
    [economicGroup]
  );

  const handleOpenModalView = useCallback(
    (group: any) => {
      if (selectedGroup?.id !== group.id || !modalOpenView) {
        setSelectedGroup(group);
        setModalOpenView(true);
        setModalOpenEdit(false);
      }
    },
    [selectedGroup, modalOpenView]
  );

  const handleOpenModalEdit = useCallback(
    (group: any) => {
      if (selectedGroup?.id !== group.id || !modalOpenEdit) {
        setSelectedGroup(group);
        setModalOpenEdit(true);
        setModalOpenView(false);
      }
    },
    [selectedGroup, modalOpenEdit]
  );

  const handleCloseModal = useCallback(() => {
    setModalOpenView(false);
    setModalOpenEdit(false);
    setSelectedGroup(null);
  }, []);

  const handleSetPage = (e: any) => {
    // Somente altere a página se o valor for diferente
    if (e?.page && e.page !== page && e.page > 0) {
      setPage(e.page);
    }
  };

  useEffect(() => {
    fetchEconomicGroup(page, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, itemsPerPage]);

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
              handleOpenModalView={handleOpenModalView}
              handleOpenModalEdit={handleOpenModalEdit}
              modalOpenView={modalOpenView}
              modalOpenEdit={modalOpenEdit}
              selectedGroup={selectedGroup}
              handleCloseModal={handleCloseModal}
              breadcrumbsGREConsult={breadcrumbsGREConsult}
              RELATION_ENTITY={RELATION_ENTITY}
              loading={loading}
              error={error}
              handleSetPage={handleSetPage}
              rowCount={totalItens}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={handleSetItemsPerPage}
            />
          )}
        </>
      )}
    </Box>
  );
};
