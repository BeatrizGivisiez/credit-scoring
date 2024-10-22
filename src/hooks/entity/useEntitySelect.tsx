import { EntityDTO } from "@/app/dto/EntityDto";
// import { useFetchEntity } from "@/hooks";
import { useFetchEntityNotInGroup } from "@/hooks";

export const useEntitySelect = (): [
  {
    label: string;
    value: number;
  }[],
  boolean,
  Array<EntityDTO>
] => {
  const { entityNotInGroup, loading } = useFetchEntityNotInGroup(); // Obtém entidades e estado de carregamento

  // Mapeia as entidades para um formato de opções
  const entitySelect = entityNotInGroup.map((entityNotInGroup: EntityDTO) => ({
    label: `${entityNotInGroup.name} - ${entityNotInGroup.documentNumber}`,
    value: entityNotInGroup.entityId // O value é o id da mae,
  }));

  return [entitySelect, loading, entityNotInGroup]; // Retorna as opções e o estado de carregamento
};
