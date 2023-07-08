import { GetChannelOptionsType, SearchChannelOptionsType } from '@pushprotocol/restapi/src/lib/channels'
import { ChatsOptionsType } from '@pushprotocol/restapi/src/lib/chat'
import { FeedsOptionsType, UserSubscriptionsOptionsType } from '@pushprotocol/restapi/src/lib/user'

export type UseNotificationsProps = FeedsOptionsType
export type UseChannelProps = GetChannelOptionsType
export type UseSearchChannelProps = SearchChannelOptionsType
export type UseUserSubscriptionProps = UserSubscriptionsOptionsType
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
