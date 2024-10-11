import { ButtonProps as MuiButtonProps } from "@mui/base";
import { SxProps } from "@mui/material";
import { ElementType } from "react";

// Definição dos tipos para os Botões
export interface ButtonProps extends MuiButtonProps {
  label: string;
  iconEnd?: React.ElementType;
  iconStart?: React.ElementType;
  href?: string;
  sx?: SxProps;
  onClick?: () => void;
  navigateTo?: string;
  disabled?: boolean;
}

// Tipos para o Componente ButtonIcon
export interface ButtonIconProps {
  placement: TooltipPlacement;
  title: string;
  icon: ElementType;
  onClick?: () => void;
  sx?: SxProps;
  weight?: WeightType;
}

// Define os tipos de peso permitidos
export type WeightType = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";

// Definição das opções de posição do Tooltip
export type TooltipPlacement =
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";
