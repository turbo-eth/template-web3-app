import { useEffect, useState } from 'react'

import axios from 'axios'

interface EstimatedRelayerFeeArgs {
  isMainnet: boolean
  originDomain: string | undefined
  destinationDomain: string | undefined
}

interface AxiosResponseData {
  relayerFee: string
}

export const useEstimatedRelayerFee = ({ isMainnet, originDomain, destinationDomain }: EstimatedRelayerFeeArgs) => {
  const [estimatedRelayerFee, setEstimatedRelayerFee] = useState('0')

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined

    const getEstimatedAmount = async () => {
      const { data } = await axios.get<AxiosResponseData>(`/api/connext/estimated-relayer-fee`, {
        params: {
          environment: isMainnet ? 'mainnet' : 'testnet',
          originDomain,
          destinationDomain,
        },
      })

      setEstimatedRelayerFee(data.relayerFee)
    }

    if (originDomain && destinationDomain) {
      if (timerId) {
        clearTimeout(timerId)
      }

      timerId = setTimeout(() => {
        getEstimatedAmount().catch((e) => console.error(e))
      }, 3000)
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [originDomain, destinationDomain])

  return estimatedRelayerFee
}
