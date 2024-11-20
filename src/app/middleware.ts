import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Defina as rotas que precisam de proteção
const protectedRoutes = ["/gre", "/utp", "/backoffice"];

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Verifica se o usuário está autenticado para as rotas protegidas
  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      // Redireciona para a página de login se o token não for encontrado
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/gre", "/utp", "/backoffice"] // Protege as rotas especificadas
};
