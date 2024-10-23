import { EconomicGroupId } from "@/app/dto/EconomicGroupIdDto";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id: string = searchParams.get("id") || ""; // Padrão para a página 1 se não especificado

  // Garantir que a variável de ambiente seja carregada corretamente
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  // Construir a URL final para a rota correta
  const url: string = `${apiUrl}EconomicGroupRelationship/GetByGroupId/${id}`; // Adicione o endpoint correto aqui
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

    const data: EconomicGroupId = await response.json();
    // console.log("Dados recebidos EconomicGroupRelationDto:", data); // Log para verificar a resposta

    return NextResponse.json(data); // Retorna os dados em formato JSON
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
