import { clients } from "../client"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const address = searchParams.get("address")
    if (!address) {
      return new Response("Missing address query parameter", { status: 400 })
    }

    const environment = searchParams.get("environment")
    if (!environment || !["mainnet", "testnet"].includes(environment)) {
      return new Response("Missing valid environment query parameter", {
        status: 400,
      })
    }

    const { mainnetSdk, testnetSdk } = await clients()

    const transfers =
      environment === "mainnet"
        ? await mainnetSdk.sdkUtils.getTransfers({ userAddress: address })
        : await testnetSdk.sdkUtils.getTransfers({ userAddress: address })

    return new Response(JSON.stringify({ transfers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
