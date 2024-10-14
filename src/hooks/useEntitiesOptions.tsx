import { EntityDTO } from "@/dto/EntityDto";
import useFetchEntities from "@/hooks/entity/useFetchEntity";

export const useEntitiesOptions = (): [
  {
    label: string;
    value: string;
  }[],
  boolean,
  Array<EntityDTO>
] => {
  const { entity, loading } = useFetchEntities(); // Obtém entidades e estado de carregamento

  // Mapeia as entidades para um formato de opções
  const entityOptions = entity.map((entity: EntityDTO) => ({
    label: `${entity.name} - ${entity.documentId}`,
    value: entity.documentNumber // O value pode ser apenas docId, ou conforme sua necessidade
  }));

  return [entityOptions, loading, entity]; // Retorna as opções e o estado de carregamento
};
