import { useNetwork, type Address } from "wagmi"

interface ContractChainList {
  [key: number]: Address
}

export const useLoadContractFromChainId = (list: ContractChainList) => {
  const { chain } = useNetwork()
  return list[chain?.id || 1]
}
