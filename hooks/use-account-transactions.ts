import { useQuery } from 'wagmi'

import { accountTransactions } from '../lib/actions/accountTransactions'

export const useAccountTransactions = (params?: BlockPagination) => {
  return useQuery(['accountTransactions', params], () => accountTransactions(params))
}
