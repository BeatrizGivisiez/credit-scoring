export interface EconomicGroupRelationDTO {
  name: string; //nome do grupo
  entityMotherId: number; // id ent mae
  entities: EconomicGroupRelationEntityDTO[];
}
export interface EconomicGroupRelationEntityDTO {
  childId: number; // id ent filho
  parentId: number; // id ent mae
  economicGroupTypeId: number; // id relacao
}
