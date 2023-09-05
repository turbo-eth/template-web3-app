import { ipfsGetUploadList } from '../routes/get-upload-list'

export async function GET(req: Request) {
  try {
    const data = await ipfsGetUploadList()

    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
