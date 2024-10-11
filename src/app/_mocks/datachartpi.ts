import { DataOptions } from "@/components/Charts/types";
import PALETTE from "@/styles/_palette";

export const dataOptions: DataOptions = {
  clientes: [
    {
      id: "Particular",
      label: "Particular",
      value: 10,
      color: PALETTE.GRAFIC4
    },
    {
      id: "ENI",
      label: "ENI",
      value: 15,
      color: PALETTE.GRAFIC5
    },
    {
      id: "Empresa",
      label: "Empresa",
      value: 20,
      color: PALETTE.GRAFIC3
    }
  ],
  outroSegmento: [
    {
      id: "Categoria A",
      label: "Categoria A",
      value: 25,
      color: PALETTE.GRAFIC1
    },
    {
      id: "Categoria B",
      label: "Categoria B",
      value: 35,
      color: PALETTE.GRAFIC2
    },
    {
      id: "Categoria C",
      label: "Categoria C",
      value: 40,
      color: PALETTE.GRAFIC3
    }
  ]
};
