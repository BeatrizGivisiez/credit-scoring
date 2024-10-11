export interface ConsultGREPageProps {
  isConsult: boolean;
  setIsConsult: (value: boolean) => void;
  handleSearch: (query: string) => void;
  filteredGroups: any[]; // Pode ser tipado com um array de grupos se você tiver um tipo específico para os grupos
  setIsCreatingGroup: (value: boolean) => void;
  handleOpenModalView: (group: any) => void; // Idealmente, 'any' pode ser substituído por um tipo específico de grupo
  handleOpenModalEdit: (group: any) => void;
  modalOpenView: boolean;
  modalOpenEdit: boolean;
  selectedGroup: any | null; // Pode ser um tipo específico ou 'null'
  handleCloseModal: () => void;
  breadcrumbsGREConsult: any[]; // Se você tiver um tipo específico para breadcrumbs, pode substituir 'any'
  RELATION_ENTITY: any[]; // Mesma lógica, pode ser substituído por um tipo específico de relação
  loading: boolean;
  error: any; // Pode ser um tipo específico de erro
  handleSetPage?: (e: any) => void;
  rowCount?: number;
  itemsPerPage: number;
  setItemsPerPage?: (e: any) => void;
}
