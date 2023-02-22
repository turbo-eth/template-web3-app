import { useQuery } from 'wagmi'

import { getAppUsers } from '../../lib/actions/app/get-app-users'

export const useGetAppUsers = (params?: BlockPagination) => {
  return useQuery(['appUsers', params], () => getAppUsers(params), {
    cacheTime: 0,
  })
}
