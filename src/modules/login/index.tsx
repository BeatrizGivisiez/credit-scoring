"use cliente";
import { LayoutLogin } from "@/app/templates/LayoutLogin";
import { Login } from "@/components";

export const LoginPage = () => {
  return (
    <LayoutLogin>
      <Login />
    </LayoutLogin>
  );
};
