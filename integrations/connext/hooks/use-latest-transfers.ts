import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAccount } from 'wagmi'

import { Transfer } from '../utils/types'

interface AxiosResponseData {
  transfers: Transfer[]
}

export const useLatestTransfers = (isMainnet: boolean) => {
  const { address } = useAccount()

  const fetchTransfers = async () => {
    const { data } = await axios.get<AxiosResponseData>(`/api/connext/latest-transfers`, {
      params: {
        address,
        environment: isMainnet ? 'mainnet' : 'testnet',
      },
    })
    return data.transfers
  }

  const { data: transfers = [] } = useQuery(['latestTransfers', isMainnet, address], {
    queryFn: fetchTransfers,
    refetchInterval: 10000, // Refetch data every 10 seconds
  })

  return transfers
}
