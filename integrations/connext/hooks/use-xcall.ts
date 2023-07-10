import { useEffect, useState } from 'react'

import axios from 'axios'
import { TransactionRequest } from 'viem'
import { useAccount } from 'wagmi'

interface XCallArgs {
  isMainnet: boolean
  origin: string | undefined
  destination: string | undefined
  to: string | undefined
  asset: string | undefined
  amount: string | undefined
  relayerFee: string | undefined
}

interface AxiosResponseData {
  txRequest: TransactionRequest
}

interface IXCall {
  request: TransactionRequest | undefined
  isLoading: boolean
}

export const useXcall = ({ isMainnet, origin, destination, to, asset, amount, relayerFee }: XCallArgs): IXCall => {
  const [request, setRequest] = useState<TransactionRequest>()
  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    const getXcall = async () => {
      setIsLoading(true)
      const { data } = await axios.post<AxiosResponseData>(`/api/connext/xcall`, {
        environment: isMainnet ? 'mainnet' : 'testnet',
        origin,
        destination,
        to,
        asset,
        amount,
        signer: address,
        relayerFee,
        slippage: '300',
      })

      setIsLoading(false)
      setRequest(data.txRequest)
    }

    if (origin && destination && to && asset && amount && relayerFee !== '0') getXcall().catch((e) => console.error(e))
  }, [origin, destination, to, asset, amount, relayerFee])

  return { request, isLoading }
}
