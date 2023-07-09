import { getIronSession } from 'iron-session'

import { SERVER_SESSION_SETTINGS } from '@/lib/session'

import { postCredentialIssue } from '../routes/post-credential-issue'

export async function POST(req: Request) {
  try {
    const res = new Response()
    const prunedReq = await req.json()

    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)

    const isAdmin = session?.siwe?.isAdmin || false

    if (!isAdmin) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (!prunedReq.recipientDID) {
      return new Response('recipientDID not found', { status: 400 })
    }
    const info = await postCredentialIssue(prunedReq)

    if (info) {
      return new Response(JSON.stringify(info), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
