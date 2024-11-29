import dynamic from "next/dynamic";
import { LayoutDefault } from "../templates/LayoutDefault";
import {
  StepperContextProvider,
  CharacteristicRelationProvider,
  EconomicGroupProvider
} from "@/app/context";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

const EconomicGroupsPage = dynamic(
  () => import("@/modules/gre").then((mod) => mod.EconomicGroupsPage),
  { ssr: false }
);

export default async function EconomicGroups() {
  // Verifique a sessão no servidor
  // const session = await getServerSession();

  // if (!session) {
  //   // Redirecione o usuário se ele não estiver autenticado
  //   redirect("/");
  // }
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
