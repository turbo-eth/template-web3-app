import { getIronSession } from 'iron-session'
import { SiweMessage } from 'siwe'

import { env } from '@/env.mjs'
import { prisma } from '@/lib/prisma'
import { SERVER_SESSION_SETTINGS } from '@/lib/session'

const admins = env.APP_ADMINS?.split(',') || []

export async function POST(req: Request) {
  try {
    const res = new Response(JSON.stringify({ ok: true }))
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)
    const { message, signature } = await req.json()
    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.validate(signature)
    if (fields.nonce !== session.nonce) return new Response(JSON.stringify({ message: 'Invalid nonce.' }), { status: 422 })
    session.siwe = fields

    if (admins.includes(fields.address)) {
      session.isAdmin = true
    }
    await session.save()
    await prisma.user.upsert({
      where: { id: fields.address },
      update: {
        address: fields.address,
      },
      create: {
        id: fields.address,
        address: fields.address,
      },
    })

    return res
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error(errorMessage)
    return new Response(JSON.stringify({ ok: false }))
  }
}
