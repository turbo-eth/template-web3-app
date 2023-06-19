import { getIronSession } from 'iron-session'

import { prisma } from '@/lib/prisma'
import { SERVER_SESSION_SETTINGS } from '@/lib/session'

export type Users = Awaited<ReturnType<typeof prisma.user.findMany>>

export async function GET(req: Request) {
  try {
    const res = new Response()
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)
    const isAdmin = session.isAdmin
    if (!isAdmin) {
      return new Response('Unauthorized', { status: 401 })
    }
    const users = await prisma.user.findMany()
    return new Response(JSON.stringify({ users, object: 'Users' }))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return new Response(errorMessage, { status: 500 })
  }
}
