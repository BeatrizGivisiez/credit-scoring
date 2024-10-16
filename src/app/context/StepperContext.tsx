"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface IStepperContext {
  groupName: string;
  setGroupName: Dispatch<SetStateAction<string>>;
  parentGroup: number | undefined;
  setParentGroup: Dispatch<SetStateAction<number>>;
  associatedEntities: any[];
  setAssociatedEntities: Dispatch<SetStateAction<Array<any>>>;
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
  const [groupName, setGroupName] = useState<string>(""); // Nome do grupo
  const [parentGroup, setParentGroup] = useState<number>(0); // id da Mae do grupo
  const [associatedEntities, setAssociatedEntities] = useState<Array<IAssocietedEntitiesContext>>(
    []
  );

  return (
    <StepperContext.Provider
      value={{
        groupName,
        setGroupName,
        parentGroup,
        setParentGroup,
        associatedEntities,
        setAssociatedEntities
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
