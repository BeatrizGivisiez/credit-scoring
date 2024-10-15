import { RadioOption } from "@/components/Inputs/InputRadio/types";
import { CharacteristicRelationDTO } from "@/dto/CharacteristicRelationDto";
import { useFetchCharacteristicRelation } from "@/hooks";

export const useRelationOption = (): [RadioOption[], boolean, Array<CharacteristicRelationDTO>] => {
  const { characteristicRelation, loading } = useFetchCharacteristicRelation();

  // Mapeia as entidades para um formato de opções com id, label e value
  const relationOption = characteristicRelation.map((relation: CharacteristicRelationDTO) => ({
    id: relation.economicGroupTypeId, // Adiciona o id aqui
    label: relation.name,
    value: relation.economicGroupTypeId.toString() // Converte para string para ser compatível com o valor do radio
  }));

  return [relationOption, loading, characteristicRelation]; // Retorna as opções e o estado de carregamento
};
