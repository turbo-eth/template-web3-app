import { getIronSession } from 'iron-session'

import { discoGetCredentialsFromDID } from '@/integrations/disco/routes/get-credentials-from-did'
import { SERVER_SESSION_SETTINGS } from '@/lib/session'

export async function GET(req: Request) {
  try {
    const res = new Response()
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)
    const address = session.siwe?.address
    if (!address) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const did = searchParams.get('did')
    if (!did) {
      return new Response('Missing did query parameter', { status: 400 })
    }

    const credentials = await discoGetCredentialsFromDID(did)

    return new Response(JSON.stringify(credentials), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
