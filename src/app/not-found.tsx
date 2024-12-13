import dynamic from "next/dynamic";

// Importa LoginPage com SSR desativado
const NotFoundCustom = dynamic(() => import("@/components").then((mod) => mod.NotFoundCustom), {
  ssr: false
});

export default function NotFound() {
  return (
    <>
      <NotFoundCustom />
    </>
  );
}
