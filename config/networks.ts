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

const CHAINS_SUPPORTED_BY_ALCHEMY = [mainnet, goerli, sepolia] // TODO add other chains supported by Alchemy
const CHAINS_SUPPORTED_BY_INFURA = [mainnet, goerli, sepolia] // TODO add other chains supported by Infura
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

if (process.env.NEXT_PUBLIC_USE_HARDHAT_PROVIDER) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_HARDHAT)
  PROVIDERS.push(publicProvider())
}

// Include public provider if no other providers are available.
if (process.env.NEXT_PUBLIC_USE_PUBLIC_PROVIDER || PROVIDERS.length === 0) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_PUBLIC_PROVIER)
  PROVIDERS.push(publicProvider())
}

// deduplicate chains
const UNIQUE_CHAINS = [...new Set(CHAINS)]

// @ts-ignore
// TODO: The sepolia chain is throwing type errors for some reason.
export const { chains, provider } = configureChains(UNIQUE_CHAINS, [...PROVIDERS])
