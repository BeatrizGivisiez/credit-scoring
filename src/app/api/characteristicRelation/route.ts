//src/app/api/characteristicRelation/route.ts
import { CharacteristicRelationDTO } from "@/dto/CharacteristicRelationDto";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  // Garantir que a variável de ambiente seja carregada corretamente
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  // Construir a URL final para a rota correta
  const url: string = `${apiUrl}EconomicGroupType/GetAll`; // Adicione o endpoint correto aqui
  const headers: HeadersInit = {
    accept: "application/ld+json"
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: CharacteristicRelationDTO[] = await response.json();
    console.log("Dados recebidos CharacteristicRelationDto:", data); // Log para verificar a resposta

    return NextResponse.json(data); // Retorna os dados em formato JSON
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//POST
export async function POST(request: Request): Promise<NextResponse> {
  const body: CharacteristicRelationDTO = await request.json();

  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }
  // Construir a URL final para a rota correta
  const url: string = `${apiUrl}EconomicGroupType/Insert`; // Adicione o endpoint correto aqui
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
