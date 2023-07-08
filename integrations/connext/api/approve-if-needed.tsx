import { clients } from '../client'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const originDomain = searchParams.get('originDomain')
    if (!originDomain) {
      return new Response('Missing origin domain query parameter', { status: 400 })
    }

    const asset = searchParams.get('assetAddress')
    if (!asset) {
      return new Response('Missing asset query parameter', { status: 400 })
    }

    const amount = searchParams.get('amount')
    if (!amount) {
      return new Response('Missing amount query parameter', { status: 400 })
    }

    const signer = searchParams.get('signer')
    if (!signer) {
      return new Response('Missing signer query parameter', { status: 400 })
    }

    const environment = searchParams.get('environment')
    if (!environment || !['mainnet', 'testnet'].includes(environment)) {
      return new Response('Missing valid environment query parameter', { status: 400 })
    }

    const { mainnetSdk, testnetSdk } = await clients(signer)

    const tx =
      environment === 'mainnet'
        ? await mainnetSdk.sdkBase.approveIfNeeded(originDomain, asset, amount)
        : await testnetSdk.sdkBase.approveIfNeeded(originDomain, asset, amount)

    return new Response(JSON.stringify({ txRequest: tx }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
