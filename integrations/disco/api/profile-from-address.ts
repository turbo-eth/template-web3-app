import { getIronSession } from "iron-session"

import { SERVER_SESSION_SETTINGS } from "@/lib/session"
import { discoGetProfileFromAddress } from "@/integrations/disco/routes/get-profile-from-address"

export async function GET(req: Request) {
  try {
    const res = new Response()
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)
    const address = session.siwe?.address
    if (!address) {
      return new Response("Unauthorized", { status: 401 })
    }

    const profile = await discoGetProfileFromAddress(address)
    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })
  }
}
