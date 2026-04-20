import { NextRequest, NextResponse } from "next/server";
import { searchTranscriptLibrary } from "@/modules/search";

function pickQuery(value: string | null): string {
  return (value ?? "").trim();
}

export function GET(request: NextRequest) {
  const query = pickQuery(request.nextUrl.searchParams.get("q"));
  const response = searchTranscriptLibrary(query);
  return NextResponse.json(response);
}
