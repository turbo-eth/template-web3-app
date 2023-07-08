import { clients } from '../client'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const origin = searchParams.get('origin')
    if (!origin) {
      return new Response('Missing origin domain query parameter', { status: 400 })
    }

    const destination = searchParams.get('destination')
    if (!destination) {
      return new Response('Missing destination query parameter', { status: 400 })
    }

    const to = searchParams.get('to')
    if (!to) {
      return new Response('Missing to query parameter', { status: 400 })
    }

    const asset = searchParams.get('asset')
    if (!asset) {
      return new Response('Missing asset query parameter', { status: 400 })
    }

    const amount = searchParams.get('amount')
    if (!amount) {
      return new Response('Missing amount query parameter', { status: 400 })
    }

    const relayerFee = searchParams.get('relayerFee')
    if (!relayerFee) {
      return new Response('Missing relayerFee query parameter', { status: 400 })
    }

    const slippage = searchParams.get('slippage')
    if (!slippage) {
      return new Response('Missing slippage query parameter', { status: 400 })
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

    const data =
      environment === 'mainnet'
        ? await mainnetSdk.sdkBase.xcall({ origin, destination, to, asset, amount, slippage, relayerFee })
        : await testnetSdk.sdkBase.xcall({ origin, destination, to, asset, amount, slippage, relayerFee })

    return new Response(JSON.stringify({ txRequest: { ...data, value: relayerFee } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
