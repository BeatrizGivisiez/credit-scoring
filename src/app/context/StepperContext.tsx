//src/app/context/StepperContext.tsx

"use client";
import { useEntitySelect, useFetchEconomicGroup } from "@/hooks";
import { EntitySelectOption } from "@/hooks/entity/useEntitySelect";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  useMemo
} from "react";

interface IStepperContext {
  entitySelect: EntitySelectOption[];
  groupName: string;
  setGroupName: Dispatch<SetStateAction<string>>;
  parentGroup: string | undefined;
  setParentGroup: Dispatch<SetStateAction<string>>;
  associatedEntities: IAssocietedEntitiesContext[];
  setAssociatedEntities: Dispatch<SetStateAction<IAssocietedEntitiesContext[]>>;
  associateEntitiesIds: string[];
  setAssociateEntitiesIds: Dispatch<SetStateAction<string[]>>;
  optionsModal: EntitySelectOption[];
  resetStepper: () => void; // Adicionando a função resetStepper no contexto
  existingGroupNames: string[]; // Lista de nomes já existentes
  validateGroupName: (name: string) => string | null; // Função de validação
}

export interface IAssocietedEntitiesContext {
  id: number;
  entityId: number;
  entity: string;
  documentNumber: string;
  characteristicRelation: IRelationContext[];
}

interface IRelationContext {
  relationId: string;
  relaionName: string;
}

export const StepperContext = createContext<IStepperContext>({} as IStepperContext);

export const useStepperContext = () => useContext(StepperContext);

export const StepperContextProvider = ({ children }: { children: ReactNode }) => {
  const [entitySelect] = useEntitySelect();

  const [groupName, setGroupName] = useState<string>(""); // Nome do grupo
  const [parentGroup, setParentGroup] = useState<string>(""); // id da Mae do grupo
  const [associatedEntities, setAssociatedEntities] = useState<Array<IAssocietedEntitiesContext>>(
    []
  );
  const [associateEntitiesIds, setAssociateEntitiesIds] = useState<string[]>([]);

  // Obtendo a lista de grupos usando o hook useFetchEconomicGroup
  const { economicGroup } = useFetchEconomicGroup(); // Supondo que `data` retorna os grupos

  // Extrair apenas os nomes dos grupos da resposta
  const existingGroupNames = useMemo(() => {
    return economicGroup?.map((group: any) => group.name.trim().toLowerCase()) || [];
  }, [economicGroup]);

  // Função para validar o nome do grupo
  const validateGroupName = (name: string): string | null => {
    const normalizedNewName = name.trim().toLowerCase();
    const normalizedExistingNames = existingGroupNames.map((existingName) =>
      existingName.trim().toLowerCase()
    );
    if (normalizedExistingNames.includes(normalizedNewName)) {
      return "Esse nome de grupo já existe. Por favor, escolha outro nome.";
    }
    return null;
  };

  const optionsModal = useMemo(() => {
    console.log("ParentGroup", parentGroup);
    console.log("associateEntitiesIds", associateEntitiesIds);
    console.log("entitySelect", entitySelect);
    return entitySelect.filter((e: EntitySelectOption) => {
      return e.value === parentGroup || associateEntitiesIds.includes(e.value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentGroup, associateEntitiesIds]);
  // [parentGroup, associateEntitiesIds, entitySelect]);

  const resetStepper = () => {
    setGroupName("");
    setParentGroup("");
    setAssociatedEntities([]);
    setAssociateEntitiesIds([]);
  };

  return (
    <StepperContext.Provider
      value={{
        entitySelect,
        groupName,
        setGroupName,
        parentGroup,
        setParentGroup,
        associatedEntities,
        setAssociatedEntities,
        associateEntitiesIds,
        setAssociateEntitiesIds,
        optionsModal,
        resetStepper,
        existingGroupNames, // Lista de nomes de grupos já existentes
        validateGroupName // Função de validação
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
