import { NextResponse } from "next/server";
import { getLineLoginUrl } from "@/app/services/line.service";

export async function GET() {
  const url = await getLineLoginUrl();
  return NextResponse.json({ url });
}
