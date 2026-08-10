/**
 * Next.js API route for IPFS Pay-to-Pin file upload.
 * Handles x402 microUSDC payment signing server-side.
 *
 * POST /api/paytopin/pin
 * Body: { filename: string, data: string (base64) }
 * Returns: { cid: string, gatewayUrl: string, status: string, message: string }
 */

import { env } from "@/env.mjs"
import { z } from "zod"

// Lazy-load the SDK to avoid bundling algosdk/client-side
async function getSdk() {
  return await import("ipfs-pay-to-pin-client")
}

const pinSchema = z.object({
  filename: z.string().min(1),
  data: z.string().min(1), // base64 encoded file data
})

export async function POST(req: Request) {
  try {
    const { mnemonic, gatewayUrl, network, maxPriceUsdc } = {
      mnemonic: process.env.IPFS_PAY_TO_PIN_MNEMONIC,
      gatewayUrl: process.env.IPFS_PAY_TO_PIN_GATEWAY_URL || "https://pay-to-pin.duckdns.org",
      network: (process.env.IPFS_PAY_TO_PIN_NETWORK || "mainnet") as "mainnet" | "testnet",
      maxPriceUsdc: Number(process.env.IPFS_PAY_TO_PIN_MAX_PRICE_USDC) || 1.0,
    }

    if (!mnemonic) {
      return new Response(
        JSON.stringify({ ok: false, error: "IPFS_PAY_TO_PIN_MNEMONIC not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const { filename, data } = pinSchema.parse(await req.json())

    if (!filename || !data) {
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid parameters: filename and data (base64) are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Initialize the Pay-to-Pin SDK client
    const { IpfsPayToPinClient } = await getSdk()
    const client = new IpfsPayToPinClient({
      gatewayUrl,
      mnemonic,
      network,
      maxPriceUsdc,
    })

    // Pin the file — SDK handles x402 payment flow automatically
    const result = await client.pinFile({
      filename,
      data: Buffer.from(data, "base64"),
    })

    return new Response(
      JSON.stringify({
        ok: true,
        cid: result.ipfs_cid,
        gatewayUrl: result.gateway_url,
        status: result.status,
        message: result.message,
        expiresAt: result.expires_at,
        ttlDays: result.ttl_days,
        renewalUrl: result.renewal_url,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error("[Pay-to-Pin] Error:", errorMessage)

    // Distinguish between payment errors and other errors
    if (errorMessage.includes("InsufficientBudgetError")) {
      return new Response(
        JSON.stringify({ ok: false, error: "Price exceeds maximum allowed" }),
        { status: 402, headers: { "Content-Type": "application/json" } }
      )
    }
    if (errorMessage.includes("PaymentDeclinedError")) {
      return new Response(
        JSON.stringify({ ok: false, error: "Payment declined" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({ ok: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
