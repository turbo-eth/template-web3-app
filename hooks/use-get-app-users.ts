import { useQuery } from 'wagmi'

import { getAppUsers } from '../lib/actions/getAppUsers'

export const useGetAppUsers = (params?: BlockPagination) => {
  return useQuery(['appUsers', params], () => getAppUsers(params), {
    cacheTime: 0,
  })
}
