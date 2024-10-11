import dynamic from "next/dynamic";

import { LayoutDefault } from "../templates/LayoutDefault";

const ScoringPage = dynamic(() => import("@/modules/utp").then((mod) => mod.ScoringPage), {
  ssr: false
});

export default async function Scoring() {
  return (
    <LayoutDefault>
      <ScoringPage />
    </LayoutDefault>
  );
}
