import { useQuery } from 'wagmi'

import { accountTransactions } from '../../lib/actions/etherscan/accountTransactions'

export const useAccountTransactions = (params?: BlockPagination) => {
  return useQuery(['accountTransactions', params], () => accountTransactions(params))
}
