import { getIronSession } from 'iron-session'

import { SERVER_SESSION_SETTINGS } from '@/lib/session'

export async function GET(req: Request) {
  const res = new Response()
  const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)
  return new Response(JSON.stringify({ address: session.siwe?.address }))
}
