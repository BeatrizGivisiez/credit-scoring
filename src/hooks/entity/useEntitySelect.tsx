import { EntityDTO } from "@/app/dto/EntityDto";
import { useFetchNotInGroupEntity } from "../notInGroupEntity/useFetchNotInGroupEntity";

export interface EntitySelectOption {
  label: string;
  value: string;
}

export const useEntitySelect = (): [
  EntitySelectOption[],
  boolean,
  Array<EntityDTO>,
  () => void
] => {
  const { notInGroupEntity, loading, refetch } = useFetchNotInGroupEntity();

  const getUniqueListBy = (arr: any[], key: string) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

  const entitySelect = notInGroupEntity.map((item: EntityDTO) => ({
    label: `${item.name} - ${item.documentNumber}`,
    value: `${item.entityId}-${item.documentNumber}`
  }));

  return [getUniqueListBy(entitySelect, "label"), loading, notInGroupEntity, refetch];
};
