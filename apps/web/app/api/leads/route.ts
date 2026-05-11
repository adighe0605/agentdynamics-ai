import { NextResponse } from "next/server";
import { mockLeads } from "@agentdynamics/types/mock";

/**
 * GET /api/leads
 *
 * NOTE: Currently returns mock data so the dashboard works without a database.
 * Replace the body with a Prisma query once DATABASE_URL is configured:
 *
 *   import { prisma } from "@agentdynamics/backend";
 *   const leads = await prisma.lead.findMany({ orderBy: { lastTouchAt: "desc" }, take: 50 });
 *   return NextResponse.json(leads);
 */
export async function GET() {
  return NextResponse.json(mockLeads);
}
