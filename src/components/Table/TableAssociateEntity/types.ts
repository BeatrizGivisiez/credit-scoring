export type CreateGroup = {
  id: string;
  parentClient: string;
  nif: string;
  characteristicRelation?: number;
};

export interface TableAssociateEntityProps {
  createGroups: CreateGroup[];
  pageSize?: number;
  handleDeleteRow?: (id: string) => void;
}
