import { useEffect, useState } from 'react'

import axios from 'axios'
import { TransactionRequest } from 'viem'
import { useAccount } from 'wagmi'

interface ApproveIfNeededArgs {
  isMainnet: boolean
  originDomain: string | undefined
  assetAddress: string | undefined
  amount: string | undefined
}

interface AxiosResponseData {
  txRequest: TransactionRequest
}

interface IUseApproveIfNeeded {
  request: TransactionRequest | undefined
  isLoading: boolean
}

export const useApproveIfNeeded = ({ isMainnet, originDomain, assetAddress, amount }: ApproveIfNeededArgs): IUseApproveIfNeeded => {
  const [request, setRequest] = useState<TransactionRequest>()
  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    const getApproveIfNeeded = async () => {
      setIsLoading(true)
      const { data } = await axios.post<AxiosResponseData>(`/api/connext/approve-if-needed`, {
        environment: isMainnet ? 'mainnet' : 'testnet',
        originDomain,
        assetAddress,
        amount,
        signer: address,
      })
      setIsLoading(false)
      setRequest(data.txRequest)
    }
    if (originDomain && assetAddress && amount) getApproveIfNeeded().catch((e) => console.error(e))
  }, [isMainnet, originDomain, assetAddress, amount])

  return { request, isLoading }
}
