export interface ConsultGREPageProps {
  isConsult: boolean;
  setIsConsult: (value: boolean) => void;
  handleSearch: (query: string) => void;
  setIsCreatingGroup: (value: boolean) => void;
  handleOpenModalView: (group: any) => void;
  handleOpenModalEdit: (group: any) => void;
  selectedGroup: any | null; // Pode ser um tipo específico ou 'null'
  handleCloseModal: () => void;
  breadcrumbsGREConsult: any[]; // Se você tiver um tipo específico para breadcrumbs, pode substituir 'any'
  modalMode: "view" | "edit" | null; // Definição de tipo para o modalMode
  filteredGroups: any[];
  loading: boolean;
  error: any;
}
