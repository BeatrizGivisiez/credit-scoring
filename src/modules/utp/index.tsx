"use client";

import { Tabs } from "@/components";
import { ChartLine, FileText, Users } from "@phosphor-icons/react";
import { HomeUTP } from "./home-utp/HomeUTP";
import { EntityUTP } from "./entity-utp/EntityUTP";
import { ContractUTP } from "./contract-utp/ContractUTP";

const tabs = [
  {
    value: 0,
    label: "Power BI",
    iconStart: ChartLine,
    content: <HomeUTP /> // integracao com o PowerBi
  },
  {
    value: 1,
    label: "Entidades",
    iconStart: Users,
    content: <EntityUTP />
    // TODO: Breadcrumb com botao voltar / search / tabela lista de clientes com acoes Olho.
  },
  {
    value: 2,
    label: "Contratos",
    iconStart: FileText,
    content: <ContractUTP />
    // TODO: Breadcrumb com botao voltar / search / tabela lista de contratos com acoes Olho.
  }
];
export const ScoringPage = () => {
  return <Tabs tabs={tabs} />;
};
