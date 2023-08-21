import * as PushAPI from '@pushprotocol/restapi'
import { useQuery } from '@tanstack/react-query'

import { UseNotificationsProps } from '../utils/types'

const fetchNotifications = async ({ user, spam, env, page, limit, raw }: UseNotificationsProps) => {
  return (await PushAPI.user.getFeeds({
    ...{ user, spam, env, page, limit, raw },
    raw: true,
  })) as PushAPI.ApiNotificationType[]
}

export const useNotifications = ({ user, spam, env, page, limit, raw }: UseNotificationsProps) => {
  return useQuery(['notifications', user, spam, env, page, limit, raw], {
    queryFn: () => fetchNotifications({ user, spam, env, page, limit, raw }),
    refetchOnWindowFocus: false,
  })
}
