import { NextResponse } from "next/server";

import { EconomicGroupRelationDTO } from "@/app/dto/EconomicGroupRelationDto";

export async function POST(request: Request): Promise<NextResponse> {
  const body: EconomicGroupRelationDTO = await request.json();

  // Garantir que a variável de ambiente seja carregada corretamente
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  // Construir a URL final para a rota correta
  const url: string = `${apiUrl}EconomicGroupRelationship/Insert`; // Adicione o endpoint correto aqui
  const headers: HeadersInit = {
    accept: "application/ld+json",
    "Content-Type": "application/ld+json"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body) // Converte o corpo em JSON
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data); // Retorna os dados recebidos da API
  } catch (error: any) {
    console.error("Erro ao enviar dados:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
