import { EntitiesDto } from "@/dto/entitiesDto";
import useFetchEntities from "@/hooks/useFetchEntities";

export const useEntitiesOptions = (): [
  {
    label: string;
    value: string;
  }[],
  boolean,
  Array<EntitiesDto>
] => {
  const { entities, loading } = useFetchEntities(1); // Obtém entidades e estado de carregamento

  // Mapeia as entidades para um formato de opções
  const entitiesOptions = entities.map((entity: EntitiesDto) => ({
    label: `${entity.nmReduzido} - ${entity.docId}`,
    value: entity["@id"] // O value pode ser apenas docId, ou conforme sua necessidade
  }));

  return [entitiesOptions, loading, entities]; // Retorna as opções e o estado de carregamento
};
