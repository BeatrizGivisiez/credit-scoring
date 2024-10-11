export interface EntitiesDto {
  "@id": string;
  "@type": string;
  cdEntidade: number;
  nmReduzido: string;
  docId: string;
  dtCriacao: string;
}

export interface EntitiesResponse {
  member: EntitiesDto[];
}
