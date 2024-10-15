import { CharacteristicRelationDTO } from "./CharacteristicRelationDto";
import { EntityDTO } from "./EntityDto";

export interface EconomicGroupRelationDTO {
  status: boolean;
  created: string; // Pode ser Date se você preferir manipular como objeto de data
  updated: string; // Pode ser Date
  deleted: string | null; // Pode ser null para representar itens não deletados
  economicGroupRelationshipId: number;
  economicGroupId: number;
  parentId: number;
  parent: EntityDTO;
  childId: number;
  child: EntityDTO;
  economicGroupTypeId: number;
  economicGroupType: CharacteristicRelationDTO;
}
