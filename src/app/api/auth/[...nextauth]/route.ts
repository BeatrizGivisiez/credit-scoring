import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const body = {
          email: credentials.email,
          password: credentials.password
        };

        const url = process.env.NEXTAUTH_URL + "/api/authentication";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          console.error("Authentication failed:", response.statusText);
          return null;
        }

        const user = await response.json();

        if (user && response.status) {
          return {
            id: user.id,
            nome: user.nome,
            name: user.nome,
            email: user.email,
            perfilId: user.perfilId,
            status: user.status
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt" // Usar JWT para autenticação de sessão
  },
  secret: process.env.NEXTAUTH_SECRET // Defina o segredo no seu arquivo .env
});

export { handler as GET, handler as POST };
