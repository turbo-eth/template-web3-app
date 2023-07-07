import { postCredentialIssue } from '../routes/post-credential-issue'

export async function POST(req: Request) {
  try {
    const ff = await req.json()

    const info = await postCredentialIssue(ff)

    if (info) {
      return new Response(JSON.stringify(info), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }
  } catch (error) {
    throw new Error('Error Found', error)
  }
}
