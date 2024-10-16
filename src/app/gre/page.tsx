import dynamic from "next/dynamic";
import { LayoutDefault } from "../templates/LayoutDefault";
import { EconomicGroupProvider } from "../context/EconomicGroupContext";

const EconomicGroupsPage = dynamic(
  () => import("@/modules/gre").then((mod) => mod.EconomicGroupsPage),
  { ssr: false }
);

export default async function EconomicGroups() {
  return (
    <LayoutDefault>
      <EconomicGroupProvider>
        <EconomicGroupsPage />
      </EconomicGroupProvider>
    </LayoutDefault>
  );
}
