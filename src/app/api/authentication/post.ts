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

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json(); // Processa o JSON normalmente
      return NextResponse.json(data);
    } else if (response.ok) {
      // Se a resposta for 2xx, mas não tiver JSON, retorna sucesso com uma mensagem genérica
      return NextResponse.json({ message: "Sucesso, mas sem conteúdo na resposta" });
    } else {
      // Lança erro para respostas com status não OK
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    } // Retorna os dados recebidos da API
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
