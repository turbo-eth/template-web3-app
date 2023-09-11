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

  return await fetch(
    `${GITCOIN_API_BASE_URL}/stamps/${params.address}?include_metadata=true`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": env.GITCOIN_PASSPORT_API_KEY,
      },
    }
  )
}
