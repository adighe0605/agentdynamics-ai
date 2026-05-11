import { NextResponse } from "next/server";
import { mockCalls } from "@agentdynamics/types/mock";

export async function GET() {
  return NextResponse.json(mockCalls);
}
