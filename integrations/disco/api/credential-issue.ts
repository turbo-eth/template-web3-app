import { postCredentialIssue } from '../routes/post-credential-issue'

export async function POST(req: Request) {
  try {
    const prunedResponse = await req.json()

    if (!prunedResponse.recipientDID) {
      return new Response('recipientDID not found', { status: 400 })
    }
    const info = await postCredentialIssue(prunedResponse)

    if (info) {
      return new Response(JSON.stringify(info), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
