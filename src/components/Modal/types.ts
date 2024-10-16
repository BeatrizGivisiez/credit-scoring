import { User } from "@/types/types";

export interface ModalProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  data: any;
}

export interface RelationData {
  id?: number | undefined;
  entityName?: string;
  nif?: string;
  relation?: string;
  createdAt?: string;
  deletedAt?: string | null;
}

export interface ModalCreateRelationGroupProps {
  open: boolean;
  handleClose: () => void;
  parentClient?: string;
  nif?: string;
  optionsEntity?: any;
  optionRelation?: any;
  handleSubmit?: (c: any) => void;
  childId?: number;
  // characteristicRelation?: number;
}
export interface ModalListGroupProps {
  open: boolean;
  handleClose: () => void;
  id?: number;
  groupName?: string;
  parentClient?: string;
  nif?: string;
  user?: string;
  version?: string;
  lastUpdate?: string;
  createdAt?: string;
  deletedAt?: string;
  characteristicRelation?: number;
  relations?: RelationData[] | undefined; // Dados das relações para popular a tabela
  optionsEntity?: any;
  optionRelation?: any;
  handleSubmit?: (c: any) => void;
}

export interface ModalCreateGroupEditProps {
  open: boolean;
  handleClose: () => void;
  data: any; // Define o tipo correto aqui se souber o formato dos dados
  parentClient: string;
  nif: number;
}

export interface ModalListUserProps {
  open: boolean;
  handleClose: () => void;
  id?: number;
  userName?: string;
  email?: string;
  password?: string;
  perfil?: any;
}

export interface ModalCreateUserProps {
  open: boolean;
  handleClose: () => void;
  users: User[];
}

export interface ModalCreateUserEditProps {
  open: boolean;
  handleClose: () => void;
  id?: number;
  userName?: string;
  password?: string;
}
