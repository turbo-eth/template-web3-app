import { useQuery } from "@tanstack/react-query"

import { useGelatoAutomateSdk } from "./use-automate-sdk"

export const useMsgSender = () => {
  const { automateSdk } = useGelatoAutomateSdk()

  return useQuery(["msg-sender", automateSdk], {
    queryFn: () => {
      return automateSdk?.getDedicatedMsgSender()
    },
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!automateSdk,
  })
}
