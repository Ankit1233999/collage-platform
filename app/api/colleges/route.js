import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const colleges = await prisma.college.findMany();

  return Response.json(colleges);
}