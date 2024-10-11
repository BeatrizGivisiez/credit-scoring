import { NextResponse } from "next/server";

import {
  EconomicGroupCreateRelationDto,
  EconomicGroupRelationDto
} from "@/dto/economicGroupRelationDto";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page: string = searchParams.get("page") || "1"; // Padrão para a página 1 se não especificado

  const url: string = `https://credit-score-dev.up.railway.app/api/economic_group_relationships?page=${page}`;
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

    const data: EconomicGroupRelationDto = await response.json();
    console.log("Dados recebidos EconomicGroupRelationDto:", data); // Log para verificar a resposta

    return NextResponse.json(data); // Retorna os dados em formato JSON
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const body: EconomicGroupCreateRelationDto = await request.json();

  const url = "https://credit-score-dev.up.railway.app/api/economic_group_relationships";
  const headers = {
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
