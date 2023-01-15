import { useNetwork } from 'wagmi'

export function useContractAutoLoad(contract: string, chainId?: number): any {
  const { chain } = useNetwork()
  switch (chainId || chain?.id) {
    case 1:
      switch (contract) {
        case 'Contract':
          return {
            address: '',
            abi: [],
          }
        default:
          throw new Error(`Unknown contract ${contract}`)
      }
    default:
      throw new Error(`Unknown network ${chain?.id}`)
  }
}
