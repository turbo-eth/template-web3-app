import * as PushAPI from "@pushprotocol/restapi"
import { useQuery } from "@tanstack/react-query"

import { UserSubscription, UseUserSubscriptionProps } from "../utils/types"

const fetchUserSubscriptions = async ({
  env,
  user,
}: UseUserSubscriptionProps) => {
  return (await PushAPI.user.getSubscriptions({
    env,
    user,
  })) as UserSubscription[]
}

export const useUserSubscriptions = ({
  env,
  user,
}: UseUserSubscriptionProps) => {
  return useQuery(["user-subscriptions", env, user], {
    queryFn: () => fetchUserSubscriptions({ env, user }),
    refetchOnWindowFocus: false,
  })
}
