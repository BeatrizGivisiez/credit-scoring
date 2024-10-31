export interface CharacteristicRelationDTO {
  status: boolean;
  created: string;
  updated: string;
  deleted: string | null;
  economicGroupTypeId: number;
  name: string;
}

export interface CreateCharacteristicRelationDTO {
  name: string;
}
