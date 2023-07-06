import * as PushAPI from '@pushprotocol/restapi'

import { usePushQuery } from './use-push-query'
import { UseNotificationsProps } from '../utils/types'

const fetchNotifications = async (props: UseNotificationsProps) => {
  return (await PushAPI.user.getFeeds({
    ...props,
    raw: true,
  })) as PushAPI.ApiNotificationType[]
}

export const useNotifications = (props: UseNotificationsProps) => {
  return usePushQuery(
    {
      fetcher: async () => {
        const result = await fetchNotifications(props)
        if (!result) throw new Error('Can not find notifications') // Push SDK doesn't throw errors :(

        return result
      },
    },
    [props.user, props.env, props.page, props.limit, props.raw]
  )
}

export const useNotificationsLazy = () => {
  return [fetchNotifications]
}
