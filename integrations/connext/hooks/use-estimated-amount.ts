import { useEffect, useState } from 'react'

import axios from 'axios'
import { BigNumberish } from 'ethers'

interface EstimatedAmountArgs {
  isMainnet: boolean
  originDomain: string | undefined
  destinationDomain: string | undefined
  originTokenAddress: string | undefined
  amount: BigNumberish | undefined
}

interface AxiosResponseData {
  amount: string
  isFastPath: boolean
}

export const useEstimatedAmount = ({ isMainnet, originDomain, destinationDomain, originTokenAddress, amount }: EstimatedAmountArgs) => {
  const [estimatedAmount, setEstimatedAmount] = useState('0')
  const [isFastPath, setIsFastPath] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    let timerId: NodeJS.Timeout | undefined

    const getEstimatedAmount = async () => {
      const { data } = await axios.get<AxiosResponseData>(`/api/connext/estimated-amount`, {
        params: {
          environment: isMainnet ? 'mainnet' : 'testnet',
          originDomain,
          destinationDomain,
          originTokenAddress,
          amount,
        },
      })

      setEstimatedAmount(data.amount)
      setIsFastPath(data.isFastPath)
      setIsLoading(false)
    }

    if (originDomain && destinationDomain && originTokenAddress && amount) {
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
  }, [originDomain, destinationDomain, originTokenAddress, amount])

  return { estimatedAmount, isFastPath, isLoading }
}
