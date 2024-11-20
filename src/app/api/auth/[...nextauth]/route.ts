import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const body = {
          username: credentials.username,
          password: credentials.password
        };

        const url = process.env.NEXT_API_HOST + "/api/authentication";

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
            username: user.username,
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
