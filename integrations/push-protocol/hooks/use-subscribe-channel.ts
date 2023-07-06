import * as PushAPI from '@pushprotocol/restapi'
import { SubscribeOptionsType } from '@pushprotocol/restapi/src/lib/channels'

import { usePushAction } from './use-push-action'
import { UseSubscribeOrUnsubscribeToChannelProps } from '../utils/types'

const subOrUnsub = (action: UseSubscribeOrUnsubscribeToChannelProps['action'], args: SubscribeOptionsType) => {
  return PushAPI.channels[action](args)
}

export const useSubscribeOrUnsubscribeToChannel = (props: UseSubscribeOrUnsubscribeToChannelProps) => {
  return usePushAction(
    {
      fetcher: async (args: SubscribeOptionsType) => {
        const result = await subOrUnsub(props.action, args)

        if (result.status === 'error') throw new Error(result.message) // Push SDK doesn't throw error

        return result
      },
    },
    [props.action]
  )
}

export const useSubscribeToChannelLazy = () => {
  return [PushAPI.channels.subscribe]
}

export const useUnsubscribeToChannelLazy = () => {
  return [PushAPI.channels.unsubscribe]
}
