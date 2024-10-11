import dynamic from "next/dynamic";
import { LayoutDefault } from "../templates/LayoutDefault";

const EconomicGroupsPage = dynamic(
  () => import("@/modules/gre").then((mod) => mod.EconomicGroupsPage),
  { ssr: false }
);

export default async function EconomicGroups() {
  return (
    <LayoutDefault>
      <EconomicGroupsPage />
    </LayoutDefault>
  );
}
