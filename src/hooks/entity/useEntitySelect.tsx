import { EntityDTO } from "@/app/dto/EntityDto";
import { useFetchEntity } from "@/hooks";

export const useEntitySelect = (): [
  {
    label: string;
    value: number;
  }[],
  boolean,
  Array<EntityDTO>
] => {
  const { entity, loading } = useFetchEntity(); // Obtém entidades e estado de carregamento

  // Mapeia as entidades para um formato de opções
  const entitySelect = entity.map((entity: EntityDTO) => ({
    label: `${entity.name} - ${entity.documentNumber}`,
    value: entity.entityId // O value é o id da mae,
  }));

  return [entitySelect, loading, entity]; // Retorna as opções e o estado de carregamento
};
