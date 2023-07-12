import { clients } from '../client'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const originDomain = searchParams.get('originDomain')
    if (!originDomain) {
      return new Response('Missing origin domain query parameter', { status: 400 })
    }

    const destinationDomain = searchParams.get('destinationDomain')
    if (!destinationDomain) {
      return new Response('Missing destination domain query parameter', { status: 400 })
    }

    const originTokenAddress = searchParams.get('originTokenAddress')
    if (!originTokenAddress) {
      return new Response('Missing origin token address query parameter', { status: 400 })
    }

    const amount = searchParams.get('amount')
    if (!amount) {
      return new Response('Missing amount query parameter', { status: 400 })
    }

    const environment = searchParams.get('environment')
    if (!environment || !['mainnet', 'testnet'].includes(environment)) {
      return new Response('Missing valid environment query parameter', { status: 400 })
    }

    if (amount === '0') {
      return new Response(JSON.stringify({ amount, isFastPath: false }))
    }

    const { mainnetSdk, testnetSdk } = await clients()

    const { amountReceived, isFastPath } =
      environment === 'mainnet'
        ? await mainnetSdk.sdkBase.calculateAmountReceived(originDomain, destinationDomain, originTokenAddress, amount, false, true)
        : await testnetSdk.sdkBase.calculateAmountReceived(originDomain, destinationDomain, originTokenAddress, amount, false, true)

    return new Response(JSON.stringify({ amount: amountReceived.toString(), isFastPath }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
