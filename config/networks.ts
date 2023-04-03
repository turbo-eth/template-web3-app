// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Networks
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { arbitrum, arbitrumGoerli, baseGoerli, goerli, hardhat, mainnet, optimism, optimismGoerli, polygon, sepolia } from '@wagmi/chains'
import { configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

// @ts-ignore
goerli.iconUrl = '/icons/NetworkEthereumTest.svg'
// @ts-ignore
sepolia.iconUrl = '/icons/NetworkEthereumTest.svg'
// @ts-ignore
arbitrumGoerli.iconUrl = '/icons/NetworkArbitrumTest.svg'
// @ts-ignore
baseGoerli.iconUrl = '/icons/NetworkBaseTest.svg'

export const ETH_CHAINS_TEST = [baseGoerli, optimismGoerli, arbitrumGoerli, goerli, sepolia, hardhat]
export const ETH_CHAINS_PROD = [mainnet, optimism, arbitrum, polygon, ...ETH_CHAINS_TEST]

export const CHAINS = process.env.NODE_ENV === 'production' ? ETH_CHAINS_PROD : ETH_CHAINS_TEST

const PROVIDERS = []

if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  PROVIDERS.push(
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    })
  )
}

if (process.env.NEXT_PUBLIC_INFURA_API_KEY) {
  PROVIDERS.push(
    infuraProvider({
      apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string,
    })
  )
}

// Fallback to public provider
// Only include public provider if no other providers are available.
if (PROVIDERS.length === 0) {
  PROVIDERS.push(publicProvider())
}

// @ts-ignore
export const { chains, provider } = configureChains(CHAINS, [...PROVIDERS])
