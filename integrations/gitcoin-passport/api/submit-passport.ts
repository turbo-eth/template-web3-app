import { env } from "@/env.mjs"
import { z } from "zod"

import { GITCOIN_API_BASE_URL } from "../utils/constants"

const submitPassportSchema = z.object({
  address: z.string(),
  signature: z.string(),
  nonce: z.string(),
})

export async function POST(req: Request) {
  if (!env.GITCOIN_PASSPORT_API_KEY)
    return new Response(
      JSON.stringify({ detail: "Gitcoin passport api key not provided." }),
      {
        status: 400,
      }
    )

  if (!env.GITCOIN_PASSPORT_SCORER_ID)
    return new Response(
      JSON.stringify({
        detail: "Gitcoin passport scorer (community) id not provided.",
      }),
      {
        status: 400,
      }
    )

  const { signature, nonce, address } = submitPassportSchema.parse(
    await req.json()
  )

  return await fetch(`${GITCOIN_API_BASE_URL}/submit-passport`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": env.GITCOIN_PASSPORT_API_KEY,
    },
    body: JSON.stringify({
      address,
      community: env.GITCOIN_PASSPORT_SCORER_ID,
      signature,
      nonce,
    }),
  })
}
