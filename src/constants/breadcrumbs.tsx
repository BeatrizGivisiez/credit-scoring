"use client";

import { Graph, UserGear } from "@phosphor-icons/react";

import PALETTE from "@/styles/_palette";

export const breadcrumbsGREConsult = [
  {
    key: "1",
    label: "Grupos Económicos",
    href: "/gre",
    icon: <Graph size={24} color={PALETTE.PRIMARY_MAIN} />
  },
  { key: "2", label: "Consultar Grupos Económicos", href: "/" }
];
export const breadcrumbsGRECreate = [
  {
    key: "1",
    label: "Grupos Económicos",
    href: "/gre",
    icon: <Graph size={24} color={PALETTE.PRIMARY_MAIN} />
  },
  { key: "2", label: "Criar Grupo Económico", href: "/" }
];

export const breadcrumbsBackoffice = [
  {
    key: "1",
    label: "BackOffice",
    href: "/backoffice",
    icon: <UserGear size={24} color={PALETTE.PRIMARY_MAIN} />
  },
  { key: "2", label: "Gestão de Utilizadores", href: "/backoffice" }
];

export const breadcrumbsBackofficeGRE = [
  {
    key: "1",
    label: "BackOffice",
    href: "/backoffice",
    icon: <UserGear size={24} color={PALETTE.PRIMARY_MAIN} />
  },
  { key: "2", label: "Gestão da Característica Relação", href: "/backoffice" }
];
export const breadcrumbsBackofficeUTPEntity = [
  {
    key: "1",
    label: "BackOffice",
    href: "/backoffice",
    icon: <UserGear size={24} color={PALETTE.PRIMARY_MAIN} />
  },
  { key: "3", label: "Gestão da Característica Entidades", href: "/backoffice" }
];
export const breadcrumbsBackofficeUTPContract = [
  {
    key: "1",
    label: "BackOffice",
    href: "/backoffice",
    icon: <UserGear size={24} color={PALETTE.PRIMARY_MAIN} />
  },
  { key: "3", label: "Gestão da Característica Contratos", href: "/backoffice" }
];

export const breadcrumbsUTP = [
  {
    key: "1",
    label: "Scoring",
    href: "/utp",
    icon: <UserGear size={24} color={PALETTE.PRIMARY_MAIN} />
  },
  { key: "2", label: "Gestão da Característica Relação", href: "/backoffice" }
];
