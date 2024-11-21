import { EconomicGroupDTO } from "@/app/dto/EconomicGroupDto";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  const url: string = `${apiUrl}EconomicGroup/GetAll`;
  const headers: HeadersInit = {
    accept: "application/ld+json"
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

  try {
    const response = await fetch(url, {
      method: "GET",
      // cache: "no-cache",
      headers: headers,
      signal: controller.signal
    });

    clearTimeout(timeout); // Limpa o timeout se a resposta foi concluída a tempo

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: EconomicGroupDTO = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    if (error.name === "AbortError") {
      return NextResponse.json(
        { error: "A solicitação demorou muito e foi abortada." },
        { status: 504 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
