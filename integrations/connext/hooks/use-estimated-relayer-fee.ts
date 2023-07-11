import { useQuery } from '@tanstack/react-query'
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
  const fetchData = async () => {
    const { data } = await axios.get<AxiosResponseData>(`/api/connext/estimated-relayer-fee`, {
      params: {
        environment: isMainnet ? 'mainnet' : 'testnet',
        originDomain,
        destinationDomain,
      },
    })
    return data
  }

  const { data: { relayerFee } = {} } = useQuery(['estimatedRelayerFee', isMainnet, originDomain, destinationDomain], {
    queryFn: fetchData,
    enabled: !!originDomain && !!destinationDomain, // only fetch if both params are truthy
  })

  return relayerFee || '0'
}
