type RelationList = {
  id: number;
  characteristicRelation: string;
  createdAt?: string;
  deletedAt?: string | null;
  status?: boolean | string;
  inativar?: boolean | string;
};

export interface TableRelationProps {
  relationList: RelationList[];
  pageSize?: number;
}
