import * as PushAPI from "@pushprotocol/restapi"
import { UnSubscribeOptionsType } from "@pushprotocol/restapi/src/lib/channels"
import { useMutation } from "@tanstack/react-query"

const unsubscribe = (args: UnSubscribeOptionsType) => {
  return PushAPI.channels.unsubscribe(args)
}

export const useUnsubscribe = () => {
  return useMutation({
    mutationFn: unsubscribe,
  })
}
