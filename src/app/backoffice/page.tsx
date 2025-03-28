import dynamic from "next/dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LayoutDefault } from "../templates/LayoutDefault";

const BackOfficePage = dynamic(
  () => import("@/modules/backoffice").then((mod) => mod.BackOfficePage),
  {
    ssr: false
  }
);

export default async function BackOffice() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <LayoutDefault session={session}>
      <BackOfficePage />
    </LayoutDefault>
  );
}
