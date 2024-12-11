import dynamic from "next/dynamic";

// Importa LoginPage com SSR desativado
const LoginPage = dynamic(() => import("@/modules/login").then((mod) => mod.LoginPage), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <LoginPage />
    </>
  );
}
