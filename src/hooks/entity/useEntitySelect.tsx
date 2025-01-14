import { useEffect, useState } from "react";
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
  const [cachedEntitySelect, setCachedEntitySelect] = useState<EntitySelectOption[]>([]);

  const getUniqueListBy = (arr: any[], key: string) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

  useEffect(() => {
    // Carrega os dados do localStorage ao montar o hook
    const storedEntitySelect = localStorage.getItem("entitySelectCache");
    if (storedEntitySelect) {
      try {
        const parsedEntitySelect = JSON.parse(storedEntitySelect) as EntitySelectOption[];
        setCachedEntitySelect(parsedEntitySelect);
      } catch (error) {
        console.error("Erro ao carregar entitySelect do localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Atualiza o localStorage sempre que o notInGroupEntity mudar
    if (notInGroupEntity.length > 0) {
      const entitySelect = notInGroupEntity.map((item: EntityDTO) => ({
        label: `${item.name} - ${item.documentNumber}`,
        value: `${item.entityId}-${item.documentNumber}`
      }));

      const uniqueEntitySelect = getUniqueListBy(entitySelect, "label");
      setCachedEntitySelect(uniqueEntitySelect); // Atualiza o estado local
      localStorage.setItem("entitySelectCache", JSON.stringify(uniqueEntitySelect)); // Salva no localStorage
    }
  }, [notInGroupEntity]);

  return [cachedEntitySelect, loading, notInGroupEntity, refetch];
};
