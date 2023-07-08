import * as PushAPI from '@pushprotocol/restapi'
import { useQuery } from '@tanstack/react-query'

import { Channel, UseSearchChannelProps } from '../utils/types'

const searchChannels = async (props: UseSearchChannelProps) => {
  return (await PushAPI.channels.search(props)) as Channel[]
}

export const useSearchChannels = (props: UseSearchChannelProps) => {
  return useQuery(['search-channels', props.query, props.env, props.page, props.limit], {
    queryFn: () => searchChannels(props),
    refetchOnWindowFocus: false,
  })
}
