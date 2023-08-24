import { getIronSession } from "iron-session"

import { SERVER_SESSION_SETTINGS } from "@/lib/session"
import { discoGetProfileFromDID } from "@/integrations/disco/routes/get-profile-from-did"

export async function GET(req: Request) {
  try {
    const res = new Response()
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)
    const address = session.siwe?.address
    if (!address) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const did = searchParams.get("did")
    if (!did) {
      return new Response("Missing did query parameter", { status: 400 })
    }

    const profile = await discoGetProfileFromDID(did)

    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
