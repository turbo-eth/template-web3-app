import console from "console"

import { getMoralis } from "../client"
import { formatSchema, transactionAPIMethodsSchema } from "../utils/types"

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      method: string
    }
  }
) {
  try {
    const { searchParams } = new URL(req.url)
    const chain = searchParams.get("chain")
    const transactionHash = searchParams.get("transactionHash")
    const address = searchParams.get("address")
    const method = transactionAPIMethodsSchema.safeParse(params.method)
    const format = formatSchema.safeParse(searchParams.get("format"))

    if (!format.success) throw new Error("Invalid format")
    if (!method.success) throw new Error("Invalid method")

    const safeMethod = method.data
    const acceptsTransactionHash =
      safeMethod === "getTransaction" ||
      safeMethod === "getTransactionVerbose" ||
      safeMethod === "getInternalTransactions"

    if (!chain || acceptsTransactionHash ? !transactionHash : !address)
      throw new Error("Invalid query parameters")

    const Moralis = getMoralis()
    if (!Moralis) throw new Error("Moralis not initialized")

    let transaction
    if (acceptsTransactionHash) {
      transaction = await Moralis.EvmApi.transaction[safeMethod]({
        chain: chain as string,
        transactionHash: transactionHash as string,
      })
    } else {
      transaction = await Moralis.EvmApi.transaction[safeMethod]({
        chain: chain as string,
        address: address as string,
      })
    }

    const response =
      format.data === "raw" ? transaction?.raw : transaction?.result
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error(errorMessage)
    return new Response(errorMessage, { status: 500, statusText: errorMessage })
  }
}
