"use client";
import { Tabs } from "@/components";
import { Graph, UserGear } from "@phosphor-icons/react";

import { ManagerGREPage } from "./manager-gre/ManagerGRE";
import { ManagerUserPage } from "./manager-user/ManagerUser";

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
