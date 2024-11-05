export const fetchCache = "force-no-store";
import { EntityNotInGroupDTO } from "@/app/dto/EntityNotInGroupDto";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const apiUrl: string | undefined = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API_URL não está definida" }, { status: 500 });
  }

  const url: string = `${apiUrl}Entity/GetAllNotInGroup`; // Adicione o endpoint correto aqui
  const headers: HeadersInit = {
    accept: "application/ld+json",
    "Cache-Control": "no-cache"
  };

  try {
    const response = await fetch(url, {
      cache: "no-cache",
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: EntityNotInGroupDTO[] = await response.json();

    return NextResponse.json(data); // Retorna os dados em formato JSON
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
