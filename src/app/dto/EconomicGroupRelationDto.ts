export interface EconomicGroupRelationDTO {
  name: string;
  entityMotherId: number;
  entities: EconomicGroupRelationEntityDTO[];
}
export interface EconomicGroupRelationEntityDTO {
  childId: number;
  parentId: number;
  economicGroupTypeId: number;
}
