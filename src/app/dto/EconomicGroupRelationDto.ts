export interface EconomicGroupRelationDTO {
  name: string;
  entityMotherId: number;
  entities: EconomicGroupRelationEntityDTO[];
}
export interface EconomicGroupRelationEntityDTO {
  parentId: number;
  childId: number;
  economicGroupTypeId: number;
}
