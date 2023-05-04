import { useNetwork } from 'wagmi'

interface ContractChainList {
  [key: number]: string
}

export const useLoadContractFromChainId = (list: ContractChainList) => {
  const { chain } = useNetwork()
  return (list[chain?.id || 1] as `0x${string}`) || undefined
}
