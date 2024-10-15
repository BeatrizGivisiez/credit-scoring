import { CharacteristicRelationDTO } from "./CharacteristicRelationDto";
import { EntityDTO } from "./EntityDto";

export interface EconomicGroupRelationDTO {
  economicGroupRelationshipId: number;
  economicGroupId: number;
  parentId: number;
  parent: EntityDTO;
  childId: number;
  child: EntityDTO;
  economicGroupTypeId: number;
  economicGroupType: CharacteristicRelationDTO;
  created: string; // Pode ser Date se for necessário manipular como data
  updated: string; // Pode ser Date se for necessário manipular como data
  deleted: string; // Pode ser Date se for necessário manipular como data
}
