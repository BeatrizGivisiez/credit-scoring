import { ReactNode } from "react";

export interface BreadcrumbItem {
  key: string; // Identificador único para o item
  label: string; // Texto a ser exibido no item
  href: string; // Link para onde o item aponta
  icon?: ReactNode; // Ícone inicial opcional a ser exibido
}

export interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[]; // Array de itens do breadcrumb
}
