export interface EconomicGroupRelationDto {
  "@context": string;
  "@id": string;
  "@type": string;
  id: number;
  parentEntity: string;
  childEntity: string;
  relationCharacteristic: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface EconomicGroupCreateRelationDto {
  childEntity: string;
  parentEntity: string;
  relationCharacteristic: string;
  startDate: Date;
}

export interface EconomicGroupRelationResponse {
  member: EconomicGroupRelationDto[];
}
