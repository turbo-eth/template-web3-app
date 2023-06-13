import axios from 'axios'

import getChainIdApiUrl from './get-chain-id-api-url'

export function getEtherscanClient(chainId: number, timeout = 5000, apiKey?: string) {
  const instance = axios.create({
    baseURL: getChainIdApiUrl(chainId),
    timeout: timeout,
  })

  // Inject Etherscan API key to outbound Client instance request parameters.
  instance.interceptors.request.use((config) => {
    config.params = {
      apikey: apiKey,
      ...config.params,
    }
    return config
  })

  return instance
}

export default getEtherscanClient
