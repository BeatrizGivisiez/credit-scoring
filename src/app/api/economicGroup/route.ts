import { EconomicGroupCreateDto, EconomicGroupDto } from "@/dto/economicGroupDto";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page: string = searchParams.get("page") || "1"; // Padrão para a página 1 se não especificado
  const itemsPerPage: string = searchParams.get("itemsPerPage") || "10"; // Padrão 10 itens por página se não especificado

  const url: string = `https://credit-score-dev.up.railway.app/api/economic_groups?page=${page}&itemsPerPage=${itemsPerPage}`;
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

    const data: EconomicGroupDto = await response.json();
    console.log("Dados recebidos EconomicGroupDto:", data); // Log para verificar a resposta

    return NextResponse.json(data); // Retorna os dados em formato JSON
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const body: EconomicGroupCreateDto = await request.json();

  const url = "https://credit-score-dev.up.railway.app/api/economic_groups";
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
