import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const prisma = getPrismaClient();
  const colleges = await prisma.college.findMany();

  return NextResponse.json(colleges);
}
