import { CharacteristicRelationDTO } from "./CharacteristicRelationDto";
import { EntityDTO } from "./EntityDto";

export interface EconomicGroupId {
  status: boolean;
  created: string;
  updated: string;
  deleted: string;
  economicGroupRelationshipId: number;
  economicGroupId: number;
  parentId: number;
  parent: EntityDTO;
  childId: number;
  child: EntityDTO;
  economicGroupTypeId: number;
  economicGroupType: CharacteristicRelationDTO;
}
