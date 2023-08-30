import { clients } from "../client"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const originDomain = searchParams.get("originDomain")
    if (!originDomain) {
      return new Response("Missing origin domain query parameter", {
        status: 400,
      })
    }

    const destinationDomain = searchParams.get("destinationDomain")
    if (!destinationDomain) {
      return new Response("Missing destination domain query parameter", {
        status: 400,
      })
    }

    const environment = searchParams.get("environment")
    if (!environment || !["mainnet", "testnet"].includes(environment)) {
      return new Response("Missing valid environment query parameter", {
        status: 400,
      })
    }

    const { mainnetSdk, testnetSdk } = await clients()

    const data =
      environment === "mainnet"
        ? await mainnetSdk.sdkBase.estimateRelayerFee({
            originDomain,
            destinationDomain,
          })
        : await testnetSdk.sdkBase.estimateRelayerFee({
            originDomain,
            destinationDomain,
          })

    return new Response(JSON.stringify({ relayerFee: data.toString() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
