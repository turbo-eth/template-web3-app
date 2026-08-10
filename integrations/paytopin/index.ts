/**
 * IPFS Pay-to-Pin storage provider.
 *
 * Provides an optional IPFS storage layer using pay-as-you-go
 * Algorand microUSDC x402 payments via the Pay-to-Pin gateway.
 *
 * Usage:
 *   import { uploadToPayToPin, uploadFilesToPayToPin } from "@/integrations/paytopin"
 *
 *   const result = await uploadToPayToPin(file)
 *   // => { cid: string, gatewayUrl: string }
 */

export interface PayToPinResult {
  cid: string
  gatewayUrl: string
  status: string
  message: string
  expiresAt: string
  ttlDays: number
  renewalUrl: string
}

export interface PayToPinMultiResult {
  results: { cid: string; gatewayUrl: string; filename: string }[]
  totalPinned: number
}

/**
 * Upload a single file to IPFS via Pay-to-Pin.
 * Uses a server-side API route to handle x402 payment signing.
 *
 * @param file - File-like object with name and readAsArrayBuffer method
 * @returns Promise resolving to the pin result with CID and gateway URL
 */
export async function uploadToPayToPin(file: {
  name: string
  arrayBuffer: () => Promise<ArrayBuffer>
}): Promise<PayToPinResult> {
  // Encode file as base64
  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString("base64")

  const response = await fetch("/api/paytopin/pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      data: base64,
    }),
  })

  const result = await response.json()

  if (!result.ok) {
    throw new Error(`Pay-to-Pin upload failed: ${result.error}`)
  }

  return {
    cid: result.cid,
    gatewayUrl: result.gatewayUrl,
    status: result.status,
    message: result.message,
    expiresAt: result.expiresAt,
    ttlDays: result.ttlDays,
    renewalUrl: result.renewalUrl,
  }
}

/**
 * Upload multiple files to IPFS via Pay-to-Pin.
 *
 * @param files - Array of File-like objects
 * @returns Promise resolving to results for all uploaded files
 */
export async function uploadFilesToPayToPin(
  files: { name: string; arrayBuffer: () => Promise<ArrayBuffer> }[]
): Promise<PayToPinMultiResult> {
  const results: { cid: string; gatewayUrl: string; filename: string }[] = []

  for (const file of files) {
    const result = await uploadToPayToPin(file)
    results.push({
      cid: result.cid,
      gatewayUrl: result.gatewayUrl,
      filename: file.name,
    })
  }

  return { results, totalPinned: results.length }
}

/**
 * Check the retention status of a pinned CID.
 * (Free endpoint — no payment required)
 *
 * @param cid - The IPFS CID to check
 * @returns Pin status information
 */
export async function getPinStatus(cid: string): Promise<{
  pinnedAt: string
  expiresAt: string
  daysRemaining: number
  isActive: boolean
  ttlDays: number
  renewalsCount: number
  renewalUrl: string
}> {
  const response = await fetch(
    `/api/paytopin/status?cid=${encodeURIComponent(cid)}`,
    { method: "GET" }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch pin status: ${response.statusText}`)
  }

  return response.json()
}
