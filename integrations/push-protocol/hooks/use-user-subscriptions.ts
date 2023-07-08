import * as PushAPI from '@pushprotocol/restapi'
import { useQuery } from '@tanstack/react-query'

import { UseUserSubscriptionProps, UserSubscription } from '../utils/types'

const fetchUserSubscriptions = async (props: UseUserSubscriptionProps) => {
  return (await PushAPI.user.getSubscriptions(props)) as UserSubscription[]
}

export const useUserSubscriptions = (props: UseUserSubscriptionProps) => {
  return useQuery(['user-subscriptions', props.env, props.user], {
    queryFn: () => fetchUserSubscriptions(props),
    refetchOnWindowFocus: false,
  })
}
