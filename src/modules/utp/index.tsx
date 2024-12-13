"use client";

import { Tabs } from "@/components";
import { BuildingOffice, FileText, PresentationChart } from "@phosphor-icons/react";
import { ContractUTP } from "./contract-utp/ContractUTP";
import { EntityUTP } from "./entity-utp/EntityUTP";
import { HomeUTP } from "./home-utp/HomeUTP";

const tabs = [
  {
    value: 0,
    label: "Power BI",
    iconStart: PresentationChart,
    content: <HomeUTP />
  },
  {
    value: 1,
    label: "Entidades",
    iconStart: BuildingOffice,
    content: <EntityUTP />
  },
  {
    value: 2,
    label: "Contratos",
    iconStart: FileText,
    content: <ContractUTP />
  }
];
export const ScoringPage = () => {
  return <Tabs tabs={tabs} />;
};
