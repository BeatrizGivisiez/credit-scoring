export interface CharacteristicRelationDTO {
  status: boolean;
  created: string;
  updated: string;
  deleted: string | null;
  economicGroupTypeId: number;
  name: string;
  inativar: boolean;
}

export interface CreateCharacteristicRelationDTO {
  name: string;
}

export interface DeletedCharacteristicRelationDTO {
  id: number;
}
