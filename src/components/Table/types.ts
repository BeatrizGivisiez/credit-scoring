export interface Group {
  id: number;
  groupName: string;
  createdAt: string;
  quantityRelation: number; // Quantidade de relações
  parentClient: string; // Nome da entidade mãe
  nif: string; // NIF da entidade mãe
  deletedAt: string; // Status do grupo (Inativo ou Ativo)
}

export interface TableListGroupProps {
  onViewGroup: (group: any) => void;
  onEditGroup: (group: any) => void;
  groups: Group[];
  handleChangePagination?: (e: any) => void;
  rowCount?: number;
  itemsPerPage?: number;
  setItemsPerPage?: (e: number) => void;
}

export type CreateGroup = {
  id: string;
  parentClient: string;
  nif: string;
  characteristicRelation?: number;
};
export interface TableAssociatedEntitiesEGProps {
  createGroups: CreateGroup[];
  pageSize?: number;
  handleDeleteRow?: (id: string) => void;
}

export interface TableProps {
  userList: UserList[];
  pageSize?: number;
}

type UserList = {
  id: number | string;
  userName: string;
  email: string;
  password: string;
  perfil: string;
};

type RelationList = {
  id: number;
  characteristicRelation: string;
  createdAt?: string;
  deletedAt?: string;
  status?: boolean | string;
};

export interface TableRelationProps {
  relationList: RelationList[];
  pageSize?: number;
}
