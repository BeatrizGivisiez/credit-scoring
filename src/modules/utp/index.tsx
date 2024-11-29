"use client";

import { Tabs } from "@/components";
import { PresentationChart, FileText, BuildingOffice } from "@phosphor-icons/react";
import { HomeUTP } from "./home-utp/HomeUTP";
import { EntityUTP } from "./entity-utp/EntityUTP";
import { ContractUTP } from "./contract-utp/ContractUTP";

const tabs = [
  {
    value: 0,
    label: "Power BI",
    iconStart: PresentationChart,
    content: <HomeUTP /> // integracao com o PowerBi
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
