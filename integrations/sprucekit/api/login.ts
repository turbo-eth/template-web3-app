import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import type { SiweMessage } from 'siwe'
import { z } from 'zod'

import { env } from '@/env.mjs'
import { prisma } from '@/lib/prisma'
import { SERVER_SESSION_SETTINGS } from '@/lib/session'

import ssx from './_ssx'

const admins = env.APP_ADMINS?.split(',') || []

const loginSchema = z.object({
  siwe: z.string(),
  signature: z.string(),
  daoLogin: z.boolean(),
  resolveEns: z.boolean(),
  resolveLens: z.boolean(),
})

interface Session {
  session: {
    siwe: SiweMessage
  }
}

export async function POST(req: Request) {
  try {
    const request = loginSchema.safeParse(await req.json())
    if (!request.success) {
      return new Response(JSON.stringify({ ok: false }))
    }
    const cookieStore = cookies()
    const nonce = cookieStore.get('nonce')
    const { siwe, daoLogin, resolveEns, resolveLens, signature } = request.data
    const ssxSession: Session = await ssx.login(siwe, signature, daoLogin, resolveEns, nonce?.value ?? '', resolveLens)
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
