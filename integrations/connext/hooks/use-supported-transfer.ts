import { Contract } from '../utils/types'

interface SupportedTransferArgs {
  originChainId: number | undefined
  destinationChainId: number | undefined
  assetDataContracts: Contract[] | undefined
}

const getContract = (chainId: number, contracts: Contract[]): Contract | undefined => {
  return contracts.find((contract) => contract.chain_id === chainId)
}

export const useSupportedTransfer = ({ originChainId, destinationChainId, assetDataContracts }: SupportedTransferArgs): boolean => {
  if (!originChainId || !destinationChainId || !assetDataContracts) return false
  return !!(getContract(originChainId, assetDataContracts) && getContract(destinationChainId, assetDataContracts))
}
