export interface ChartPieProps {
  title: string;
  width: number;
  height: number;
}

export type SegmentType = "clientes" | "outroSegmento";

export type DataOption = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export type DataOptions = {
  [key in SegmentType]: DataOption[];
};

export interface ChartBarProps {
  title: string;
  width?: number;
  height?: number;
  // data?: ChartBarData[];
  colors?: string[];
}

// interface ChartBarData {
//   group: string;
//   quantidade: number;
//   dataCriacao: string;
// }
