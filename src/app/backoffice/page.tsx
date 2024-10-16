import dynamic from "next/dynamic";

import { LayoutDefault } from "../templates/LayoutDefault";

const BackOfficePage = dynamic(
  () => import("@/modules/backoffice").then((mod) => mod.BackOfficePage),
  {
    ssr: false
  }
);

export default async function BackOffice() {
  return (
    <LayoutDefault>
      <BackOfficePage />
    </LayoutDefault>
  );
}
