import { useQuery } from 'wagmi'

import { getAppUsers } from '../../app/get-app-users'

export const useGetAppUsers = (queryKey?: any) => {
  return useQuery(['appUsers', queryKey], () => getAppUsers(), {
    cacheTime: 0,
  })
}
