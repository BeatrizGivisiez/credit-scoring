export interface EconomicGroupRelationDTO {
  name: string; //nome do grupo
  entityMotherId: string; // id ent mae
  entities: EconomicGroupRelationEntityDTO[];
}
export interface EconomicGroupRelationEntityDTO {
  childId: number; // id ent filho
  parentId: number; // id ent mae
  economicGroupTypeId: number; // id relacao
}

export interface EconomicGroupRelationNewEntityDTO {
  economicGroupId: number;
  parentId: number | undefined;
  childId: number;
  economicGroupTypeId: number;
}
