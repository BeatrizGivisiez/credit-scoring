import { EconomicGroupRelationDTO } from "./EconomicGroupRelationDto";
import { EntityDTO } from "./EntityDto";

export interface EconomicGroupDTO {
  economicGroupId: number;
  name: string;
  entityMotherId: number;
  entityMother: EntityDTO;
  entities: EconomicGroupRelationDTO[];
  created: string; // Pode ser Date se for necessário manipular como data
  updated: string; // Pode ser Date se for necessário manipular como data
  deleted: string; // Pode ser Date se for necessário manipular como data
}
