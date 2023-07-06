import * as PushAPI from '@pushprotocol/restapi'

import { usePushQuery } from './use-push-query'
import { Channel, UseSearchChannelProps } from '../utils/types'

const searchChannels = async (props: UseSearchChannelProps) => {
  return (await PushAPI.channels.search(props)) as Channel[]
}

export const useSearchChannels = (props: UseSearchChannelProps) => {
  return usePushQuery(
    {
      fetcher: () => searchChannels(props),
    },
    [props.query, props.env, props.page, props.limit]
  )
}

export const useSearchChannelsLazy = () => {
  return [searchChannels]
}
