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

const CHAINS_SUPPORTED_BY_ALCHEMY = [mainnet, goerli, sepolia]
const CHAINS_SUPPORTED_BY_INFURA = [mainnet, goerli, sepolia]
const CHAINS_SUPPORTED_BY_PUBLIC_PROVIER = [arbitrum, arbitrumGoerli, baseGoerli, goerli, mainnet, optimism, optimismGoerli, polygon, sepolia]
const CHAINS_SUPPORTED_BY_HARDHAT = [hardhat]

const PROVIDERS = []
const CHAINS = []

if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_ALCHEMY)
  PROVIDERS.push(
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    })
  )
}

if (process.env.NEXT_PUBLIC_INFURA_API_KEY) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_INFURA)
  PROVIDERS.push(
    infuraProvider({
      apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string,
    })
  )
}

// Fallback to public provider
// Only include public provider if no other providers are available.
if (process.env.NEXT_PUBLIC_USE_PUBLIC_PROVIDER) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_PUBLIC_PROVIER)
  PROVIDERS.push(publicProvider())
}

if (process.env.NEXT_PUBLIC_USE_HARDHAT) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_HARDHAT)
  PROVIDERS.push(publicProvider())
}

// deduplicate chains
const UNIQUE_CHAINS = [...new Set(CHAINS)]

// @ts-ignore
export const { chains, provider } = configureChains(UNIQUE_CHAINS, [...PROVIDERS])
