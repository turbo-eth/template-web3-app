/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { postCredentialIssue } from '../routes/post-credential-issue'

export async function POST(req: Request) {
  try {
    const res = new Response()
    // const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)

    const ff = await req.json()
    // console.log('req:::::::::::::::', ff)

    console.log('req.body::::', req.body)
    console.log('ekfbvkej:::::::::::::::::')
    const info = await postCredentialIssue(ff)
    // console.log('sess', session)
    console.log('info:::', info)
    // console.log('session details:', session)

    console.log('ekfbvkej:::::::::::::')
    if (info) {
      return new Response(JSON.stringify(info), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
  } catch (error) {
    console.log('erreor,ci', error)
    // alert('errir:::', error)
    return new Response(error, { status: 539 })
  }
}
