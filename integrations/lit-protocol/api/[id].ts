import { env } from "@/env.mjs"

import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set")

    const id = params.id
    const message = await prisma.litProtocolMessage.findFirst({
      where: {
        id: id,
      },
    })

    if (!message) {
      return new Response("Message not found", { status: 404 })
    }

    return new Response(JSON.stringify(message), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.log(errorMessage)
    return new Response(errorMessage, { status: 500 })
  }
}
