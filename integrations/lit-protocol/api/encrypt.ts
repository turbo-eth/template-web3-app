import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { encryptedString, accessControlConditions, encryptedSymmetricKeyString } = await req.json()

    if (!encryptedString || !accessControlConditions || !encryptedSymmetricKeyString) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const litProtocolMessage = await prisma.litProtocolMessage.create({
      data: {
        encryptedString,
        metadata: {
          accessControlConditions,
          encryptedSymmetricKey: encryptedSymmetricKeyString,
        },
      },
    })

    return new Response(JSON.stringify(litProtocolMessage), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error(errorMessage)
    return new Response(JSON.stringify({ ok: false, error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
