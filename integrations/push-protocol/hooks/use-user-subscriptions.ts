import * as PushAPI from '@pushprotocol/restapi'

import { usePushQuery } from './use-push-query'
import { UseUserSubscriptionProps, UserSubscription } from '../utils/types'

const fetchUserSubscriptions = async (props: UseUserSubscriptionProps) => {
  return (await PushAPI.user.getSubscriptions(props)) as UserSubscription[]
}

export const useUserSubscriptions = (props: UseUserSubscriptionProps) => {
  return usePushQuery(
    {
      fetcher: () => fetchUserSubscriptions(props),
    },
    [props.env, props.user]
  )
}

export const useUserSubscriptionsLazy = () => {
  return [fetchUserSubscriptions]
}
