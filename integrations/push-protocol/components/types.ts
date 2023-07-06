import { ApiNotificationType } from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/uiweb'

export type NotificationProps = {
  notification: ApiNotificationType
}

export type NotificationFeedProps = {
  notifications?: ApiNotificationType[]
  spamNotifications?: ApiNotificationType[]
  notificationsIsLoading: boolean
  spamNotificationsIsLoading: boolean
}

export type ChannelCardProps = {
  channelAddress: string
  env: ENV
}
