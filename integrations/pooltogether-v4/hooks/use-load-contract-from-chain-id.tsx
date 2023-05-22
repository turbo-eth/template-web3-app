import { useNetwork } from 'wagmi'

interface ContractChainList {
  [key: number]: `0x${string}`
}

export const useLoadContractFromChainId = (list: ContractChainList) => {
  const { chain } = useNetwork()
  return list[chain?.id || 1]
}
