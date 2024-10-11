export interface CharacteristicRelationDto {
  "@id": string;
  "@type": string;
  id: number;
  label: string;
  createdAt: string;
}
export interface CharacteristicRelationCreateDto {
  label: string;
  createdAt: string;
}

export interface CharacteristicRelationResponse {
  member: CharacteristicRelationDto[];
}
