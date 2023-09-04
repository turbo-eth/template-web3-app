import { env } from '@/env.mjs'

export function GET(req: Request) {
  const web3StorageKey = env.WEB3_STORAGE_KEY

  return new Response(JSON.stringify({ web3StorageKey }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
