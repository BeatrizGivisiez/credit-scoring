import dynamic from "next/dynamic";

import { LayoutDefault } from "../templates/LayoutDefault";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

const ScoringPage = dynamic(() => import("@/modules/utp").then((mod) => mod.ScoringPage), {
  ssr: false
});

export default async function Scoring() {
  // // Verifique a sessão no servidor
  // const session = await getServerSession();

  // if (!session) {
  //   // Redirecione o usuário se ele não estiver autenticado
  //   redirect("/");
  // }

  return (
    <LayoutDefault>
      <ScoringPage />
    </LayoutDefault>
  );
}
