import { prisma } from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const message = await prisma.litProtocolMessage.findFirst({
      where: {
        id: id as string,
      },
    })

    if (!message) {
      return new Response('Message not found', { status: 404 })
    }

    return new Response(JSON.stringify(message), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.log(errorMessage)
    return new Response(errorMessage, { status: 500 })
  }
}
