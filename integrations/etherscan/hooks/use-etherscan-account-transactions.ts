import { useQuery } from 'wagmi'

import { appEtherscanAccountTransactions } from '@/integrations/etherscan/actions/etherscan-account-transactions/client'

export const useEtherscanAccountTransactions = (params?: BlockPagination, queryKey?: any) => {
  return useQuery(['accountTransactions', params, queryKey], () => appEtherscanAccountTransactions(params), {
    cacheTime: 0,
  })
}
