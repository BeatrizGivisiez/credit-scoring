// types/next-auth.d.ts
declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      nome?: string | null;
      email?: string | null;
      perfilId?: number | null;
      status?: string | null;
    };
  }

  interface User {
    id: string;
    nome: string;
    email: string;
    perfilId: number;
    status: string;
  }
}
