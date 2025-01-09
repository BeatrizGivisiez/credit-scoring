// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    perfilId: number; // Adicione o campo 'perfilId' ao tipo 'User'
  }

  interface Session {
    user: {
      name: string;
      email: string;
      image?: string;
      perfilId: number; // Adicione o campo 'perfilId' ao tipo 'Session.user'
    };
  }

  interface JWT {
    perfilId: number; // Adicione o campo 'perfilId' ao tipo 'JWT'
  }
}
