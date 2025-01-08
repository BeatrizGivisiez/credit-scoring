// src/types/next-auth.d.ts
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// Estende o tipo User padrão para incluir perfilId
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  perfilId?: number; // Aqui você adiciona o campo customizado
}

// Estende a Session para incluir o User customizado
interface CustomSession extends Session {
  user?: User;
}

// Estende a interface de Token para incluir o User customizado
interface CustomJWT extends JWT {
  user?: User;
}
