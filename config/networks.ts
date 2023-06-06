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

const CHAINS_SUPPORTED_BY_ALCHEMY = [mainnet, goerli, sepolia] // TODO add other chains supported by Alchemy
const CHAINS_SUPPORTED_BY_INFURA = [mainnet, goerli, sepolia] // TODO add other chains supported by Infura
const CHAINS_SUPPORTED_BY_PUBLIC_PROVIER = [
  arbitrum,
  arbitrumGoerli,
  baseGoerli,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  celo,
  celoAlfajores,
  sepolia,
]
const CHAINS_SUPPORTED_BY_HARDHAT = [hardhat]

const PROVIDERS = []
const CHAINS = []

if (env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_ALCHEMY)
  PROVIDERS.push(
    alchemyProvider({
      apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    })
  )
}

if (env.NEXT_PUBLIC_INFURA_API_KEY) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_INFURA)
  PROVIDERS.push(
    infuraProvider({
      apiKey: env.NEXT_PUBLIC_INFURA_API_KEY,
    })
  )
}

if (env.NEXT_PUBLIC_USE_HARDHAT_PROVIDER === 'true') {
  CHAINS.push(...CHAINS_SUPPORTED_BY_HARDHAT)
  PROVIDERS.push(publicProvider())
}

// Include public provider if no other providers are available.
if (env.NEXT_PUBLIC_USE_PUBLIC_PROVIDER === 'true' || PROVIDERS.length === 0) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_PUBLIC_PROVIER)
  PROVIDERS.push(publicProvider())
}

// deduplicate chains
const UNIQUE_CHAINS = [...new Set(CHAINS)]

// @ts-ignore
// TODO: The sepolia chain is throwing type errors for some reason.
export const { chains, provider } = configureChains(UNIQUE_CHAINS, [...PROVIDERS])
