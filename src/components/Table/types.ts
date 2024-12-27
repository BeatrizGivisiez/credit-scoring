import { UserDTO } from "@/app/dto/UserDto";

export interface Group {
  id: number;
  groupName: string;
  createdAt: string;
  quantityRelation: number; // Quantidade de relações
  parentClient: string; // Nome da entidade mãe
  nif: string; // NIF da entidade mãe
  deletedAt: string; // Status do grupo (Inativo ou Ativo)
  status: boolean;
  entityMotherId: string;
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
  userList: UserDTO[];
  pageSize?: number;
  refetch?: () => void;
}

type RelationList = {
  id: number;
  characteristicRelation: string;
  createdAt?: string;
  deletedAt?: string | null;
  status?: boolean | string;
};

export interface TableRelationProps {
  relationList: RelationList[];
  pageSize?: number;
}
