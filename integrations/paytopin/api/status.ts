/**
 * API route to check retention status of a pinned CID.
 * Free endpoint — no x402 payment required.
 *
 * GET /api/paytopin/status?cid=<cid>
 */

import { z } from "zod"

// Lazy-load the SDK
async function getSdk() {
  return await import("ipfs-pay-to-pin-client")
}

const querySchema = z.object({
  cid: z.string().min(1),
})

export async function GET(req: Request) {
  try {
    const { pathname, searchParams } = new URL(req.url)

    // Validate path — must be exactly /api/paytopin/status
    if (!pathname.endsWith("/status")) {
      return new Response(
        JSON.stringify({ ok: false, error: "Not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      )
    }

    const cid = querySchema.parse({ cid: searchParams.get("cid") }).cid

    if (!cid) {
      return new Response(
        JSON.stringify({ ok: false, error: "cid query parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    const { mnemonic, gatewayUrl, network } = {
      mnemonic: process.env.IPFS_PAY_TO_PIN_MNEMONIC,
      gatewayUrl: process.env.IPFS_PAY_TO_PIN_GATEWAY_URL || "https://pay-to-pin.duckdns.org",
      network: (process.env.IPFS_PAY_TO_PIN_NETWORK || "mainnet") as "mainnet" | "testnet",
    }

    if (!mnemonic) {
      return new Response(
        JSON.stringify({ ok: false, error: "IPFS_PAY_TO_PIN_MNEMONIC not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    const { IpfsPayToPinClient } = await getSdk()
    const client = new IpfsPayToPinClient({
      gatewayUrl,
      mnemonic,
      network,
    })

    const status = await client.getPinStatus(cid)

    return new Response(
      JSON.stringify({
        ok: true,
        ...status,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error("[Pay-to-Pin Status] Error:", errorMessage)

    return new Response(
      JSON.stringify({ ok: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
