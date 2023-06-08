// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Networks
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import {
  arbitrum,
  arbitrumGoerli,
  baseGoerli,
  celo,
  celoAlfajores,
  goerli,
  hardhat,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
} from '@wagmi/chains'
import { configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { env } from '@/env.mjs'

// @ts-ignore
goerli.iconUrl = '/icons/NetworkEthereumTest.svg'
// @ts-ignore
sepolia.iconUrl = '/icons/NetworkEthereumTest.svg'
// @ts-ignore
arbitrumGoerli.iconUrl = '/icons/NetworkArbitrumTest.svg'
// @ts-ignore
baseGoerli.iconUrl = '/icons/NetworkBaseTest.svg'
// @ts-ignore
celo.iconUrl = '/icons/NetworkCelo.svg'
// @ts-ignore
celoAlfajores.iconUrl = '/icons/NetworkCeloTest.svg'

export const ETH_CHAINS_TEST = [goerli, sepolia, polygonMumbai, celoAlfajores, hardhat]
export const ETH_CHAINS_L2_TEST = [baseGoerli, optimismGoerli, arbitrumGoerli]
export const ETH_CHAINS_PROD = [mainnet, optimism, arbitrum, polygon, celo, goerli, baseGoerli]

export const CHAINS = process.env.NODE_ENV === 'production' ? ETH_CHAINS_PROD : [...ETH_CHAINS_TEST, ...ETH_CHAINS_L2_TEST]

const PROVIDERS = []

if (env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  PROVIDERS.push(
    alchemyProvider({
      apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    })
  )
}

if (env.NEXT_PUBLIC_INFURA_API_KEY) {
  PROVIDERS.push(
    infuraProvider({
      apiKey: env.NEXT_PUBLIC_INFURA_API_KEY as string,
    })
  )
}

// Fallback to public provider
// Only include public provider if no other providers are available.
if (PROVIDERS.length === 0 || env.NEXT_PUBLIC_USE_PUBLIC_PROVIDER === 'true') {
  PROVIDERS.push(publicProvider())
}

// @ts-ignore
export const { chains, publicClient, webSocketPublicClient } = configureChains(CHAINS, [...PROVIDERS])
