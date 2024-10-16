"use client";
import { useEntitySelect } from "@/hooks";
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
  groupName: string;
  setGroupName: Dispatch<SetStateAction<string>>;
  parentGroup: number | undefined;
  setParentGroup: Dispatch<SetStateAction<number>>;
  associatedEntities: any[];
  setAssociatedEntities: Dispatch<SetStateAction<Array<any>>>;
  associateEntitiesIds: string[];
  setAssociateEntitiesIds: Dispatch<SetStateAction<Array<string>>>;
  optionsModal: Array<any>;
}

interface IAssocietedEntitiesContext {
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

  const optionsModal = useMemo(() => {
    return entitySelect.filter((e) => {
      return (
        e.value.toString() === parentGroup?.toString() ||
        associateEntitiesIds.includes(e.value.toString())
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentGroup, associateEntitiesIds]);

  return (
    <StepperContext.Provider
      value={{
        groupName,
        setGroupName,
        parentGroup,
        setParentGroup,
        associatedEntities,
        setAssociatedEntities,
        associateEntitiesIds,
        setAssociateEntitiesIds,
        optionsModal
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
