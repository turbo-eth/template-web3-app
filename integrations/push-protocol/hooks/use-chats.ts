import * as PushAPI from '@pushprotocol/restapi'

import { usePushQuery } from './use-push-query'
import { UseChatsProps } from '../utils/types'

const fetchChats = async (props: UseChatsProps) => {
  return await PushAPI.chat.chats(props)
}

export const useChats = (props: UseChatsProps) => {
  return usePushQuery(
    {
      fetcher: () => fetchChats(props),
    },
    [props.account, props.env, props.page, props.limit, props.pgpPrivateKey, props.toDecrypt]
  )
}

export const useChatsLazy = () => {
  return [fetchChats]
}
