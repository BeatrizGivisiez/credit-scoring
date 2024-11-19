export interface EconomicGroupRelationDTO {
  name: string; //nome do grupo
  entityMotherId: string; // id ent mae
  entityMotherNif: string;
  entities: EconomicGroupRelationEntityDTO[];
}
export interface EconomicGroupRelationEntityDTO {
  childId: number; // id ent filho
  childNif: string;
  parentId: number; // id ent mae
  parentNif: string;
  economicGroupTypeId: number; // id relacao
}

export interface EconomicGroupRelationNewEntityDTO {
  economicGroupId: number;
  parentId: number | undefined;
  childId: number;
  economicGroupTypeId: number;
}
