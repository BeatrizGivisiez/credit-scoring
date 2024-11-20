import { UserCreateDTO } from "@/app/dto/UserDto";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body: UserCreateDTO = await request.json();

  // Garantir que a variável de ambiente seja carregada corretamente
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  const url: string = `${apiUrl}Users`;
  const headers: HeadersInit = {
    accept: "application/ld+json",
    "Content-Type": "application/ld+json"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body) // Converte o corpo
    });

    // Verificar se a resposta tem conteúdo antes de tentar parsear para JSON
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
    }
  } catch (error: any) {
    console.error("Erro ao enviar dados:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
