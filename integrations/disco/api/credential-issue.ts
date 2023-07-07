import { getIronSession } from 'iron-session'

import { SERVER_SESSION_SETTINGS } from '@/lib/session'

import { postCredentialIssue } from '../routes/post-credential-issue'

export async function POST(req: Request) {
  try {
    const res = new Response()
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)

    const ff = await req.json()
    console.log('req', ff)

    const info = await postCredentialIssue(ff)
    // console.log('sess', session)
    // console.log('info:::', res)
    // console.log('session details:', session)

    if (info) {
      return new Response(JSON.stringify(info), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
  } catch (error) {
    // console.log('error', error)
    // alert('errir:::', error)
    return new Response(error, { status: 539 })
  }
}
