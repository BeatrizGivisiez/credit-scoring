import { Dayjs } from "dayjs";

export interface InputDateProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  disabled?: boolean;
}
