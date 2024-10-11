export type SeverityType = "error" | "warning" | "info" | "success";

export interface AlertProps {
  severity: SeverityType;
  label: string;
  icon: React.ElementType;
  onClose?: () => void;
}
