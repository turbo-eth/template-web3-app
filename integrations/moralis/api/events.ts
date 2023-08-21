import type { SafeParseReturnType } from 'zod'

import { getMoralis } from '../client'
import { GetContractEvents, GetContractLogs, eventsAPIMethodsSchema, getContractEventsSchema, getContractLogsSchema } from '../utils/types'

export async function POST(
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
    const method = eventsAPIMethodsSchema.safeParse(params.method)

    if (!method.success) throw new Error('Invalid method')

    const safeMethod = method.data
    const isGetContractLogs = safeMethod === 'getContractLogs'

    const requestJson = await req.json()

    const safeRequest: SafeParseReturnType<GetContractLogs | GetContractEvents, GetContractLogs | GetContractEvents> = isGetContractLogs
      ? getContractLogsSchema.safeParse(requestJson)
      : getContractEventsSchema.safeParse(requestJson)

    if (!safeRequest.success) throw new Error('Invalid request body')
    const { data } = safeRequest

    const Moralis = await getMoralis()
    if (!Moralis) throw new Error('Moralis not initialized')

    let events
    if (isGetContractLogs) {
      events = await Moralis.EvmApi.events[safeMethod](data.args)
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      events = await Moralis.EvmApi.events[safeMethod](data.args)
    }

    const response = data.format === 'raw' ? events?.raw : events?.result

    return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500, statusText: errorMessage })
  }
}
