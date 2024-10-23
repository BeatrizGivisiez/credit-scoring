import dynamic from "next/dynamic";
import { LayoutDefault } from "../templates/LayoutDefault";
import {
  StepperContextProvider,
  CharacteristicRelationProvider,
  EconomicGroupProvider
} from "@/app/context";

const EconomicGroupsPage = dynamic(
  () => import("@/modules/gre").then((mod) => mod.EconomicGroupsPage),
  { ssr: false }
);

export default async function EconomicGroups() {
  return (
    <LayoutDefault>
      <CharacteristicRelationProvider>
        <EconomicGroupProvider>
          <StepperContextProvider>
            <EconomicGroupsPage />
          </StepperContextProvider>
        </EconomicGroupProvider>
      </CharacteristicRelationProvider>
    </LayoutDefault>
  );
}
