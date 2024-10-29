import { NextResponse } from "next/server";

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

  // Garantir que a variável de ambiente seja carregada corretamente
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  const url: string = `${apiUrl}/EconomicGroup/DisableGroup?id=${id}&date=${date}`;
  const headers: HeadersInit = {
    accept: "text/plain"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("text/plain")) {
      const data = await response.text(); // Usa text() para processar a resposta
      return NextResponse.json({ success: data });
    } else if (response.ok) {
      return NextResponse.json({
        message: "Operação concluída com sucesso, mas sem conteúdo de resposta."
      });
    } else {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
  } catch (error: any) {
    console.error("Erro ao enviar dados:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
