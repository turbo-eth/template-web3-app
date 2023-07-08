import * as PushAPI from '@pushprotocol/restapi'
import { useQuery } from '@tanstack/react-query'

import { UseNotificationsProps } from '../utils/types'

const fetchNotifications = async (props: UseNotificationsProps) => {
  return (await PushAPI.user.getFeeds({
    ...props,
    raw: true,
  })) as PushAPI.ApiNotificationType[]
}

export const useNotifications = (props: UseNotificationsProps) => {
  return useQuery(['notifications', props.user, props.spam, props.env, props.page, props.limit, props.raw], {
    queryFn: () => fetchNotifications(props),
    refetchOnWindowFocus: false,
  })
}
