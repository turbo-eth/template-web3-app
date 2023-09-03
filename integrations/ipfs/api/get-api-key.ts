import { env } from '@/env.mjs'

export async function GET(req: Request) {
  // Fetch the server-side environment variable here
  const web3StorageKey = env.WEB3_STORAGE_KEY

  // Return the environment variable as a JSON response
  return new Response(JSON.stringify({ web3StorageKey }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
