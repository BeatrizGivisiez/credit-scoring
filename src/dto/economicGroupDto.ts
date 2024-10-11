export interface EconomicGroupDto {
  "@context": string;
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  parent: string;
  parentDetails: ParentDetails;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ParentDetails {
  nmReduzido: string;
  docId: string;
}

export interface EconomicGroupCreateDto {
  name: string;
  parent: string;
}

export interface EconomicGroupResponse {
  member: EconomicGroupDto[];
}
