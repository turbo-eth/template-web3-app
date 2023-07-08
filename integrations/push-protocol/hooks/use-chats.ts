import * as PushAPI from '@pushprotocol/restapi'
import { useQuery } from '@tanstack/react-query'

import { UseChatsProps } from '../utils/types'

const fetchChats = async (props: UseChatsProps) => {
  return await PushAPI.chat.chats(props)
}

export const useChats = (props: UseChatsProps) => {
  return useQuery(['chats', props.account, props.env, props.page, props.limit, props.pgpPrivateKey, props.toDecrypt], {
    queryFn: () => fetchChats(props),
    refetchOnWindowFocus: false,
  })
}
