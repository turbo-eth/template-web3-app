import * as PushAPI from '@pushprotocol/restapi'
import { z } from 'zod'

import { usePushQuery } from './use-push-query'
import { Channel, UseChannelProps } from '../utils/types'

const fetchChannel = async (props: UseChannelProps) => {
  const schema = z.object({
    id: z.number(),
    channel: z.string(),
    ipfshash: z.string(),
    name: z.string(),
    info: z.string(),
    url: z.string(),
    icon: z.string(),
    processed: z.number(),
    attempts: z.number(),
    alias_address: z.string().nullable().optional(),
    alias_verification_event: z.null(),
    is_alias_verified: z.number(),
    alias_blockchain_id: z.string().nullable().optional(),
    activation_status: z.number(),
    verified_status: z.number(),
    timestamp: z.string(),
    blocked: z.number(),
    subgraph_attempts: z.number(),
    subscriber_count: z.number(),
  })

  const result = (await PushAPI.channels.getChannel(props)) as Channel
  schema.parse(result)

  return result
}

export const useChannel = (props: UseChannelProps) => {
  return usePushQuery(
    {
      fetcher: async () => {
        const result = await fetchChannel(props)
        if (!result) throw new Error('Channel not found') // Push sdk doesn't throw errors :(

        return result
      },
    },
    [props.channel, props.env]
  )
}

export const useChannelLazy = () => {
  return [fetchChannel]
}
