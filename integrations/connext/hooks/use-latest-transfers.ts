import { useEffect, useState } from 'react'

import axios from 'axios'
import { useAccount } from 'wagmi'

import { Transfer } from '../utils/types'

interface AxiosResponseData {
  transfers: Transfer[] // There is no transfer interface in Connext sdk :(
}

export const useLatestTransfers = (isMainnet: boolean) => {
  const { address } = useAccount()
  const [transfers, setTransfers] = useState<Transfer[]>([])

  useEffect(() => {
    const loadLatestTransfers = async () => {
      const { data } = await axios.get<AxiosResponseData>(`/api/connext/latest-transfers`, {
        params: {
          address,
          environment: isMainnet ? 'mainnet' : 'testnet',
        },
      })

      setTransfers(data.transfers)
    }
    loadLatestTransfers().catch((e) => console.error(e))
    const interval = setInterval(() => loadLatestTransfers(), 10 * 1000)
    return () => clearInterval(interval)
  }, [isMainnet])

  return transfers
}
