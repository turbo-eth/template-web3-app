import { useQuery } from '@tanstack/react-query'
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
  const { address } = useAccount()

  const fetchData = async () => {
    const { data } = await axios.post<AxiosResponseData>(`/api/connext/approve-if-needed`, {
      environment: isMainnet ? 'mainnet' : 'testnet',
      originDomain,
      assetAddress,
      amount,
      signer: address,
    })

    return data.txRequest
  }

  const { data: request, isLoading } = useQuery(['approveIfNeeded', isMainnet, originDomain, assetAddress, amount], {
    queryFn: fetchData,
    enabled: !!originDomain && !!assetAddress && !!amount, // only fetch if all params are truthy
  })

  return { request, isLoading }
}
