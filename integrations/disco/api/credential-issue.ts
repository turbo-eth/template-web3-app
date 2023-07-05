import { getIronSession } from 'iron-session'

import { SERVER_SESSION_SETTINGS } from '@/lib/session'

export async function POST(req: Request) {
  try {
    const res = new Response()
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)

    console.log('session details', session)
  } catch (error) {
    console.log('err', error)
  }
}
