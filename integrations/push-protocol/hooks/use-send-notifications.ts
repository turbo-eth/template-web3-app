import * as PushAPI from '@pushprotocol/restapi'
import { useMutation } from '@tanstack/react-query'

const sendNotification = (args: PushAPI.ISendNotificationInputOptions) => {
  return PushAPI.payloads.sendNotification(args)
}

export const useSendNotification = () => {
  return useMutation({
    mutationFn: sendNotification,
  })
}
