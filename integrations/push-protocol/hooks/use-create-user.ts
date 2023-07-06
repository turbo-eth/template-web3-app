import * as PushAPI from '@pushprotocol/restapi'
import { CreateUserProps } from '@pushprotocol/restapi/src/lib/user'

import { usePushAction } from './use-push-action'

const createUser = (args: CreateUserProps) => {
  return PushAPI.user.create(args)
}

export const useCreateUser = () => {
  return usePushAction(
    {
      fetcher: createUser,
    },
    []
  )
}

export const useCreateUserLazy = () => {
  return [createUser]
}
