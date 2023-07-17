import { clients } from '../client'

interface Body {
  originDomain: string
  assetAddress: string
  amount: string
  signer: string
  environment: string
}

export async function POST(req: Request) {
  try {
    if (req.method !== 'POST') {
      return new Response('Invalid request method', { status: 405 })
    }

    const body: Body = await req.json()

    const { originDomain, assetAddress, amount, signer, environment } = body

    if (!originDomain) {
      return new Response('Missing origin domain in request body', { status: 400 })
    }

    if (!assetAddress) {
      return new Response('Missing assetAddress in request body', { status: 400 })
    }

    if (!amount) {
      return new Response('Missing amount in request body', { status: 400 })
    }

    if (!signer) {
      return new Response('Missing signer in request body', { status: 400 })
    }

    if (!environment || !['mainnet', 'testnet'].includes(environment)) {
      return new Response('Missing valid environment in request body', { status: 400 })
    }

    const { mainnetSdk, testnetSdk } = await clients(signer)

    const tx =
      environment === 'mainnet'
        ? await mainnetSdk.sdkBase.approveIfNeeded(originDomain, assetAddress, amount)
        : await testnetSdk.sdkBase.approveIfNeeded(originDomain, assetAddress, amount)

    return new Response(JSON.stringify({ txRequest: tx }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
