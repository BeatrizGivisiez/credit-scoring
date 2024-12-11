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
  colors?: string[];
}
