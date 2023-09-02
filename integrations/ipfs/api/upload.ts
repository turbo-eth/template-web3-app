import { ipfsUploadFiles } from '../routes/post-upload-files'

// const ipfsSchema = z.object({
//   file: z.instanceof(File),
// })

export async function POST(req: Request) {
  try {
    // const res = new Response()
    // const prunedReq = ipfsSchema.parse(await req.json())
    const haha = await req.json()
    // console.log('prunedReq', prunedReq)
    const info = await ipfsUploadFiles(haha)

    console.log('info', info)
    if (info) {
      return new Response(JSON.stringify(info), { status: 200, headers: { 'Content-Type': 'multipart/form-data' } })
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
