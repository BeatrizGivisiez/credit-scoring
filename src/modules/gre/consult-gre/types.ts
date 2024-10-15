export interface ConsultGREPageProps {
  isConsult: boolean;
  setIsConsult: (value: boolean) => void;
  handleSearch: (query: string) => void;
  filteredGroups: any[]; // Pode ser tipado com um array de grupos se você tiver um tipo específico para os grupos
  setIsCreatingGroup: (value: boolean) => void;
  handleOpenModalView: (group: any) => void;
  handleOpenModalEdit: (group: any) => void;
  selectedGroup: any | null; // Pode ser um tipo específico ou 'null'
  handleCloseModal: () => void;
  breadcrumbsGREConsult: any[]; // Se você tiver um tipo específico para breadcrumbs, pode substituir 'any'
  // RELATION_ENTITY: any[]; // characteristicRelation: any[];
  loading: boolean;
  error: any; // Pode ser um tipo específico de erro
  modalMode: "view" | "edit" | null; // Definição de tipo para o modalMode
}
