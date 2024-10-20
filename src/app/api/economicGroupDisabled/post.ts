import { NextResponse } from "next/server";

import { EconomicGroupDisabledDTO } from "@/app/dto/EconomicGroupDisabled";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id: string | null = searchParams.get("id");
  const date: string | null = searchParams.get("date");

  // Validação de parâmetros
  if (!id || !date) {
    return NextResponse.json(
      { error: "Os parâmetros 'id' e 'date' são obrigatórios." },
      { status: 400 }
    );
  }

  const body: EconomicGroupDisabledDTO = await request.json();

  // Garantir que a variável de ambiente seja carregada corretamente
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  // Construir a URL final para a rota correta
  const url: string = `${apiUrl}EconomicGroup/DisableGroup/${id}/${date}`;
  const headers: HeadersInit = {
    accept: "application/ld+json",
    "Content-Type": "application/ld+json"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data);
    } else if (response.ok) {
      return NextResponse.json({
        message: "Operação concluída com sucesso, mas sem conteúdo JSON."
      });
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error: any) {
    console.error("Erro ao enviar dados:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
