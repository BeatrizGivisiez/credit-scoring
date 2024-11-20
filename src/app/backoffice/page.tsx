import dynamic from "next/dynamic";

import { LayoutDefault } from "../templates/LayoutDefault";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const BackOfficePage = dynamic(
  () => import("@/modules/backoffice").then((mod) => mod.BackOfficePage),
  {
    ssr: false
  }
);

export default async function BackOffice() {
  // Verifique a sessão no servidor
  const session = await getServerSession();

  if (!session) {
    // Redirecione o usuário se ele não estiver autenticado
    redirect("/");
  }

  return (
    <LayoutDefault>
      <BackOfficePage />
    </LayoutDefault>
  );
}
