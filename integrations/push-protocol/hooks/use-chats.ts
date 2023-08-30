import * as PushAPI from "@pushprotocol/restapi"
import { useQuery } from "@tanstack/react-query"

import { UseChatsProps } from "../utils/types"

const fetchChats = async (props: UseChatsProps) => {
  return await PushAPI.chat.chats(props)
}

export const useChats = ({
  account,
  env,
  page,
  limit,
  pgpPrivateKey,
  toDecrypt,
}: UseChatsProps) => {
  return useQuery(
    ["chats", account, env, page, limit, pgpPrivateKey, toDecrypt],
    {
      queryFn: () =>
        fetchChats({ account, env, page, limit, pgpPrivateKey, toDecrypt }),
      refetchOnWindowFocus: false,
    }
  )
}
