import { EntitiesDto } from "@/dto/entitiesDto";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page: string = searchParams.get("page") || "1"; // Padrão para a página 1 se não especificado

  const url: string = `https://credit-score-dev.up.railway.app/api/entities?page=${page}`;
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

    const data: EntitiesDto = await response.json();
    console.log("Dados recebidos EntitiesDto:", data); // Log para verificar a resposta

    return NextResponse.json(data); // Retorna os dados em formato JSON
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
