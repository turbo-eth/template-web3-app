import { clients } from "../client"

interface Body {
  origin: string
  destination: string
  to: string
  asset: string
  amount: string
  relayerFee: string
  slippage: string
  signer: string
  environment: string
}

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return new Response("Invalid request method", { status: 405 })
    }

    const body: Body = await req.json()

    const {
      origin,
      destination,
      to,
      asset,
      amount,
      relayerFee,
      slippage,
      signer,
      environment,
    } = body

    if (!origin) {
      return new Response("Missing origin in request body", { status: 400 })
    }

    if (!destination) {
      return new Response("Missing destination in request body", {
        status: 400,
      })
    }

    if (!to) {
      return new Response("Missing to in request body", { status: 400 })
    }

    if (!asset) {
      return new Response("Missing asset in request body", { status: 400 })
    }

    if (!amount) {
      return new Response("Missing amount in request body", { status: 400 })
    }

    if (!relayerFee) {
      return new Response("Missing relayerFee in request body", { status: 400 })
    }

    if (!slippage) {
      return new Response("Missing slippage in request body", { status: 400 })
    }

    if (!signer) {
      return new Response("Missing signer in request body", { status: 400 })
    }

    if (!environment || !["mainnet", "testnet"].includes(environment)) {
      return new Response("Missing valid environment in request body", {
        status: 400,
      })
    }

    const { mainnetSdk, testnetSdk } = await clients(signer)

    const data =
      environment === "mainnet"
        ? await mainnetSdk.sdkBase.xcall({
            origin,
            destination,
            to,
            asset,
            amount,
            slippage,
            relayerFee,
          })
        : await testnetSdk.sdkBase.xcall({
            origin,
            destination,
            to,
            asset,
            amount,
            slippage,
            relayerFee,
          })

    return new Response(
      JSON.stringify({ txRequest: { ...data, value: relayerFee } }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
