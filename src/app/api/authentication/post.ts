export const fetchCache = "force-no-store";
import { AuthenticateDTO } from "@/app/dto/AuthenticateDto";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body: AuthenticateDTO = await request.json();

  // Garantir que a variável de ambiente seja carregada corretamente
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  // Construir a URL final para a rota correta
  const url: string = `${apiUrl}Users/authenticate`; // Adicione o endpoint correto aqui
  const headers: HeadersInit = {
    // accept: "*/*",
    accept: "application/ld+json",
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch(url, {
      cache: "no-cache",
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dados recebidos UsersDto:", data); // Log para verificar a resposta

    return NextResponse.json(data); // Retorna os dados em formato JSON
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
