import * as PushAPI from '@pushprotocol/restapi'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { Channel, UseChannelProps } from '../utils/types'

const channelSchema = z.object({
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
  alias_verification_event: z.string().nullable().optional(),
  is_alias_verified: z.number(),
  alias_blockchain_id: z.string().nullable().optional(),
  activation_status: z.number(),
  verified_status: z.number(),
  timestamp: z.string(),
  blocked: z.number(),
  subgraph_attempts: z.number(),
  subscriber_count: z.number(),
})

const fetchChannel = async ({ channel, env }: UseChannelProps) => {
  const result = (await PushAPI.channels.getChannel({ channel, env })) as Channel
  channelSchema.parse(result)

  return result
}

export const useChannel = ({ channel, env }: UseChannelProps) => {
  return useQuery(['channel', channel, env], {
    queryFn: () => fetchChannel({ channel, env }),
    refetchOnWindowFocus: false,
  })
}
