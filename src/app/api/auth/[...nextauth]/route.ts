import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { TABLE_USERS } from "@/app/_mocks/tableusers";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verifica se as credenciais foram passadas
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Procura o usuário na lista mockada
        const user = TABLE_USERS.find(
          (user) => user.email === credentials.email && user.password === credentials.password
        );

        // Se o usuário foi encontrado, retorna os dados dele
        if (user && user.status) {
          return {
            id: user.id,
            name: user.userName,
            email: user.email,
            perfil: user.perfil,
            status: user.status
          };
        }

        // Retorna null se o usuário não for encontrado
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

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "email@example.com" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         // Lógica de autenticação simples
//         const user = { id: "1", name: "Admin", email: credentials?.email };

//         // Substitua esta lógica pela validação correta de usuário
//         if (credentials?.email === "admin@pkf.pt" && credentials?.password === "admin123") {
//           return user;
//         } else {
//           return null;
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt" // Usar JWT para autenticação de sessão
//   },
//   secret: process.env.NEXTAUTH_SECRET // Defina o segredo no seu arquivo .env
// });

// export { handler as GET, handler as POST };
