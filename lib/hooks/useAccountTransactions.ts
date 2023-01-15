import { useQuery } from 'wagmi'

import { accountTransactions } from '../actions/accountTransactions'

export const useAccountTransactions = (params?: BlockPagination) => {
  return useQuery(['accountTransactions'], () => accountTransactions(params))
}
