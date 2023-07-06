import * as PushAPI from '@pushprotocol/restapi'

import { usePushAction } from './use-push-action'

const sendNotification = (args: PushAPI.ISendNotificationInputOptions) => {
  return PushAPI.payloads.sendNotification(args)
}

export const useSendNotification = () => {
  return usePushAction(
    {
      fetcher: sendNotification,
    },
    []
  )
}

export const useSendNotificationLazy = () => {
  return [sendNotification]
}
