import { EntityDTO } from "@/app/dto/EntityDto";
import { useFetchNotInGroupEntity } from "../notInGroupEntity/useFetchNotInGroupEntity";

export const useEntitySelect = (): [
  {
    label: string;
    value: number;
  }[],
  boolean,
  Array<EntityDTO>,
  () => void // Nova função de atualização manual
] => {
  const { notInGroupEntity, loading, refetch } = useFetchNotInGroupEntity();

  // Mapeia as entidades para um formato de opções
  const entitySelect = notInGroupEntity.map((item: EntityDTO) => ({
    label: `${item.name} - ${item.documentNumber}`,
    value: item.entityId
  }));

  // console.log("Entidades obtidas do backend:", notInGroupEntity); // Verifique os dados recebidos
  // console.log("Opções para select:", entitySelect); // Verifique o que está sendo mapeado

  return [entitySelect, loading, notInGroupEntity, refetch];
};
