import { PaperProps } from "@mui/material";
import { ElementType, ReactNode } from "react";

export interface CardProps extends PaperProps {
  children?: ReactNode;
  padding?: boolean | number;
}

export interface CardInfoProps extends PaperProps {
  title: string;
  subTitle: string;
  icon: ElementType;
  padding?: boolean | number;
}
