import {
  AuthType,
  SismoConnect,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-server"

import { getConfig } from "../utils/getConfig"

export async function POST(req: Request) {
  try {
    const config = getConfig("auth")
    const sismoConnect = SismoConnect({ config })

    const sismoConnectResponse = await req.json().catch((error) => {
      console.error("Error parsing request body as JSON:", error)
      return null
    })

    if (sismoConnectResponse === null) {
      return new Response("Invalid JSON in request body", { status: 400 })
    }

    console.log("authApi")
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(
      sismoConnectResponse,
      {
        auths: [
          { authType: AuthType.GITHUB, isOptional: true },
          { authType: AuthType.TWITTER },
          { authType: AuthType.VAULT },
          { authType: AuthType.EVM_ACCOUNT },
        ],
      }
    )

    if (result) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 501 })
  }
}
