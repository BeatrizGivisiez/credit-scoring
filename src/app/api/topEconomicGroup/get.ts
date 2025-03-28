import { TopEconomicGroupDTO } from "@/app/dto/TopEconomicGroupDto";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  // Garantir que a variável de ambiente seja carregada corretamente
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  // Construir a URL final para a rota correta
  const url: string = `${apiUrl}Home/GetTop5GruposEconomicos`; // Adicione o endpoint correto aqui
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

    const data: TopEconomicGroupDTO = await response.json();

    return NextResponse.json(data); // Retorna os dados em formato JSON
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
