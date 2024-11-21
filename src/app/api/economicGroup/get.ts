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

  try {
    const response = await fetch(url, {
      // cache: "no-cache",
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: EconomicGroupDTO = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
