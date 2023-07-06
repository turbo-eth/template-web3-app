import { GetChannelOptionsType, SearchChannelOptionsType } from '@pushprotocol/restapi/src/lib/channels'
import { ChatsOptionsType } from '@pushprotocol/restapi/src/lib/chat'
import { FeedsOptionsType, UserSubscriptionsOptionsType } from '@pushprotocol/restapi/src/lib/user'

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type UsePushQueryReturn<T> = {
  data?: T
  error?: Error
  isLoading: boolean
  refetch: () => Promise<T>
}
export type UsePushQueryProps<T> = {
  fetcher: () => Promise<T>
}

export type UsePushActionReturn<T> = UsePushQueryReturn<T>
export type UsePushActionProps<T, F> = Omit<UsePushQueryProps<T>, 'fetcher'> & {
  fetcher: (args: F) => Promise<T>
}

export type UseNotificationsProps = FeedsOptionsType
export type UseChannelProps = GetChannelOptionsType
export type UseSearchChannelProps = SearchChannelOptionsType
export type UseUserSubscriptionProps = UserSubscriptionsOptionsType
export type UseSubscribeOrUnsubscribeToChannelProps = {
  action: 'subscribe' | 'unsubscribe'
}
export type UseChatsProps = ChatsOptionsType

export type Channel = {
  id: number
  channel: string
  ipfshash: string
  name: string
  info: string
  url: string
  icon: string
  processed: number
  attempts: number
  alias_address: string | null
  alias_verification_event: string | null
  is_alias_verified: number
  alias_blockchain_id: string | null
  activation_status: number
  verified_status: number
  timestamp: string
  blocked: number
  subgraph_attempts: number
  subscriber_count: number
}

export type UserSubscription = {
  channel: string
}
