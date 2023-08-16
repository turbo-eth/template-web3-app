import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import ssx from './_ssx'

import { env } from '@/env.mjs'
import { prisma } from '@/lib/prisma'
import { SERVER_SESSION_SETTINGS } from '@/lib/session'

const admins = env.APP_ADMINS?.split(',') || []

export async function POST(req: Request) {
  try {
    const request = await req.json()
    const cookieStore = cookies()
    const nonce = cookieStore.get('nonce')

    const ssxSession = await ssx.login(
      request.siwe,
      request.signature,
      request.daoLogin,
      request.resolveEns,
      nonce?.value ?? "",
      request.resolveLens,
    )
    const res = new Response(JSON.stringify({ ok: true }))
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)
    const fields = ssxSession.session.siwe
    session.siwe = fields

    if (admins.includes(fields.address)) {
      session.isAdmin = true
    }
    await session.save()
    if (env.DATABASE_URL) {
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
    }

    return new Response(JSON.stringify({ ...ssxSession, ok: true }))
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error(errorMessage)
    return new Response(JSON.stringify({ ok: false }))
  }
}
