import { env } from "@/env.mjs"

import { GITCOIN_API_BASE_URL } from "../utils/constants"

export async function GET(
  req: Request,
  { params }: { params: { address: string } }
) {
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

  return await fetch(
    `${GITCOIN_API_BASE_URL}/score/${env.GITCOIN_PASSPORT_SCORER_ID}/${params.address}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": env.GITCOIN_PASSPORT_API_KEY,
      },
    }
  )
}
