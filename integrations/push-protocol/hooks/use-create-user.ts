import * as PushAPI from "@pushprotocol/restapi"
import { CreateUserProps } from "@pushprotocol/restapi/src/lib/user"
import { useMutation } from "@tanstack/react-query"

const createUser = (args: CreateUserProps) => {
  return PushAPI.user.create(args)
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  })
}
