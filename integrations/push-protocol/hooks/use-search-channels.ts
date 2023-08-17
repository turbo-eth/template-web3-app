import * as PushAPI from '@pushprotocol/restapi'
import { useQuery } from '@tanstack/react-query'

import { Channel, UseSearchChannelProps } from '../utils/types'

const searchChannels = async ({ query, env, page, limit }: UseSearchChannelProps) => {
  return (await PushAPI.channels.search({ query, env, page, limit })) as Channel[]
}

export const useSearchChannels = ({ query, env, page, limit }: UseSearchChannelProps) => {
  return useQuery(['search-channels', query, env, page, limit], {
    queryFn: () => searchChannels({ query, env, page, limit }),
    refetchOnWindowFocus: false,
  })
}
