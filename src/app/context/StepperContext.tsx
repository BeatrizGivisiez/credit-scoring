"use client";
import { useEntitySelect, useFetchEconomicGroup } from "@/hooks";
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
  entitySelect: { label: string; value: number }[];
  groupName: string;
  setGroupName: Dispatch<SetStateAction<string>>;
  parentGroup: number | undefined;
  setParentGroup: Dispatch<SetStateAction<number>>;
  associatedEntities: any[];
  setAssociatedEntities: Dispatch<SetStateAction<Array<any>>>;
  associateEntitiesIds: string[];
  setAssociateEntitiesIds: Dispatch<SetStateAction<Array<string>>>;
  optionsModal: Array<any>;
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
  const [parentGroup, setParentGroup] = useState<number>(0); // id da Mae do grupo
  const [associatedEntities, setAssociatedEntities] = useState<Array<IAssocietedEntitiesContext>>(
    []
  );
  const [associateEntitiesIds, setAssociateEntitiesIds] = useState<Array<string>>([]);

  // Obtendo a lista de grupos usando o hook useFetchEconomicGroup
  const { economicGroup } = useFetchEconomicGroup(); // Supondo que `data` retorna os grupos

  // Extrair apenas os nomes dos grupos da resposta
  const existingGroupNames = economicGroup?.map((group: any) => group.name) || [];

  // Função para validar o nome do grupo
  const validateGroupName = (name: string): string | null => {
    // Normaliza o nome, removendo espaços extras e ignorando maiúsculas/minúsculas
    const normalizedNewName = name.trim().toLowerCase();

    // Normaliza os nomes dos grupos existentes da mesma forma
    const normalizedExistingNames = existingGroupNames.map((existingName) =>
      existingName.trim().toLowerCase()
    );

    // Verifica se o nome já existe na lista de grupos existentes normalizados
    if (normalizedExistingNames.includes(normalizedNewName)) {
      return "Esse nome de grupo já existe. Por favor, escolha outro nome.";
    }
    return null;
  };

  const optionsModal = useMemo(() => {
    return entitySelect.filter((e: any) => {
      return (
        e.value.toString() === parentGroup?.toString() ||
        associateEntitiesIds.includes(e.value.toString())
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentGroup, associateEntitiesIds]);

  const resetStepper = () => {
    setGroupName("");
    setParentGroup(0);
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
