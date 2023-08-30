import { useQuery } from "wagmi"

import { getAppUsers } from "../../app/get-app-users"

export const useGetAppUsers = <QueryKey>(queryKey: QueryKey) => {
  return useQuery(["appUsers", queryKey], () => getAppUsers(), {
    cacheTime: 0,
  })
}
