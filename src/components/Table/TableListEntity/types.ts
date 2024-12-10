export type EntityList = {
  id: number;
  name: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
};

export interface TableListEntityProps {
  entityList: EntityList[];
  pageSize?: number;
  onViewModal: () => void;
  onEditModal: () => void;
}
