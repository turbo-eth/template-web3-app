import { getIronSession } from "iron-session"

import { SERVER_SESSION_SETTINGS } from "@/lib/session"
import { etherscanAccountTransactions } from "@/integrations/etherscan/actions/etherscan-account-transactions"

export async function GET(req: Request) {
  try {
    const res = new Response()
    const session = await getIronSession(req, res, SERVER_SESSION_SETTINGS)
    const address = session.siwe?.address
    if (!address) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const chainId = searchParams.get("chainId")
    if (!chainId) {
      return new Response("Missing chainId", { status: 400 })
    }
    const startblock = searchParams.get("startblock")
    const endblock = searchParams.get("endblock")
    const page = searchParams.get("page")
    const offset = searchParams.get("offset")
    const config = {
      startblock: startblock ? Number(startblock) : 0,
      endblock: endblock ? Number(endblock) : 99999999,
      page: page ? Number(page) : 1,
      offset: offset ? Number(offset) : 0,
    }
    const transactions = await etherscanAccountTransactions(
      chainId,
      address,
      config
    )
    return new Response(
      JSON.stringify({ address: session.siwe?.address, transactions }),
      {
        headers: { "content-type": "application/json" },
      }
    )
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.log(errorMessage)
    return new Response(errorMessage, { status: 500 })
  }
}
