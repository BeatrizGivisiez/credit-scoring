import {
  CharacteristicRelationProvider,
  EconomicGroupProvider,
  StepperContextProvider
} from "@/app/context";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { LayoutDefault } from "../templates/LayoutDefault";

const EconomicGroupsPage = dynamic(
  () => import("@/modules/gre").then((mod) => mod.EconomicGroupsPage),
  { ssr: false }
);

export default async function EconomicGroups() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }
  return (
    <LayoutDefault session={session}>
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
