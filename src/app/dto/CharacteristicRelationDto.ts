//src/dto/CharacteristicRelationDTO
export interface CharacteristicRelationDTO {
  status: boolean;
  created: string; // Pode ser Date
  updated: string; // Pode ser Date
  deleted: string | null; // Pode ser null para representar entidades ativas
  economicGroupTypeId: number;
  name: string;
}
