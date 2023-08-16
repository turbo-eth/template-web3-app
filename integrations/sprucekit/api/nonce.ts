import { getIronSession } from 'iron-session'
import ssx from './_ssx'

import { SERVER_SESSION_SETTINGS } from '@/lib/session'

export async function GET(req: Request) {
  const nonce = ssx.generateNonce()
  const res = new Response(nonce, {
    headers: {
      'Content-Type': 'text/plain',
      'Set-Cookie': `nonce=${nonce}`
    },
  })
  const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)
  session.destroy()
  session.nonce = nonce
  await session.save()

  return res
}
