"use client";
import { Tabs } from "@/components";
import { BuildingOffice, Graph, UserGear } from "@phosphor-icons/react";

import { ManagerGREPage } from "./manager-gre/ManagerGRE";
import { ManagerUserPage } from "./manager-user/ManagerUser";
import { ManagerEntity } from "./manager-entity/ManagerEntity";
import { ManagerContract } from "./manager-contract/ManagerContract";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  },
  {
    value: 2,
    label: "Gestão da Característica Entidades",
    iconStart: BuildingOffice,
    content: <ManagerEntity />
  },
  {
    value: 3,
    label: "Gestão da Característica Contratos",
    iconStart: BuildingOffice,
    content: <ManagerContract />
  }
];

export const BackOfficePage = () => {
  const { data } = useSession();
  const router = useRouter();

  if (data?.user.perfilId !== 1) {
    router.push("/gre");
    return null;
  }

  return <Tabs tabs={tabs} />;
};
