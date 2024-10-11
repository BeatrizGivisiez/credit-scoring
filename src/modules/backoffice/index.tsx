"use client";
import { Graph, UserGear } from "@phosphor-icons/react";

import { ManagerUserPage } from "./manager-user/ManagerUser";
import { ManagerGREPage } from "./manager-gre/ManagerGRE";

import { Tabs } from "@/components";

const tabs = [
  {
    value: 0,
    label: "Gestão de Utilizadores",
    iconStart: UserGear,
    content: <ManagerUserPage />
  },
  {
    value: 1,
    label: "Gestão da Característica Relação",
    iconStart: Graph,
    content: <ManagerGREPage />
  }
];

export const BackOfficePage = () => {
  return <Tabs tabs={tabs} />;
};
