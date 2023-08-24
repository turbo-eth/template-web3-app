// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Networks
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { env } from "@/env.mjs"
import { Chain, configureChains } from "wagmi"
import {
  arbitrum,
  arbitrumGoerli as arbitrumGoerliNoIcon,
  baseGoerli as baseGoerliNoIcon,
  base as baseNoIcon,
  celoAlfajores as celoAlfajoresNoIcon,
  celo as celoNoIcon,
  gnosisChiado as gnosisChiadoNoIcon,
  gnosis as gnosisNoIcon,
  goerli as goerliNoIcon,
  hardhat,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia as sepoliaNoIcon,
} from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"

const goerli = {
  ...goerliNoIcon,
  iconUrl: "/icons/NetworkEthereumTest.svg",
}
const sepolia = {
  ...sepoliaNoIcon,
  iconUrl: "/icons/NetworkEthereumTest.svg",
}
const arbitrumGoerli = {
  ...arbitrumGoerliNoIcon,
  iconUrl: "/icons/NetworkArbitrumTest.svg",
}
const base = {
  ...baseNoIcon,
  iconUrl: "/icons/NetworkBaseTest.svg",
}

const baseGoerli = {
  ...baseGoerliNoIcon,
  iconUrl: "/icons/NetworkBaseTest.svg",
}
const celo = {
  ...celoNoIcon,
  iconUrl: "/icons/NetworkCelo.svg",
}
const celoAlfajores = {
  ...celoAlfajoresNoIcon,
  iconUrl: "/icons/NetworkCeloTest.svg",
}
const gnosis = {
  ...gnosisNoIcon,
  iconUrl: "/icons/NetworkGnosis.svg",
}
const gnosisChiado = {
  ...gnosisChiadoNoIcon,
  iconUrl: "/icons/NetworkGnosis.svg",
}

export const ETH_CHAINS_TEST = [
  mainnet,
  goerli,
  sepolia,
  polygonMumbai,
  celoAlfajores,
  gnosisChiado,
  hardhat,
]
export const ETH_CHAINS_L2_TEST = [baseGoerli, optimismGoerli, arbitrumGoerli]
export const ETH_CHAINS_PROD = [
  mainnet,
  optimism,
  arbitrum,
  polygon,
  celo,
  gnosis,
  goerli,
  base,
  baseGoerli,
]
export const ETH_CHAINS_DEV =
  env.NEXT_PUBLIC_PROD_NETWORKS_DEV === "true"
    ? [...ETH_CHAINS_PROD, ...ETH_CHAINS_TEST, ...ETH_CHAINS_L2_TEST]
    : [...ETH_CHAINS_TEST, ...ETH_CHAINS_L2_TEST]

export const CHAINS: Chain[] =
  process.env.NODE_ENV === "production" ? ETH_CHAINS_PROD : ETH_CHAINS_DEV

const PROVIDERS = []

if (env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  if (!env.NEXT_PUBLIC_ALCHEMY_API_KEY)
    throw new Error("NEXT_PUBLIC_ALCHEMY_API_KEY is not defined")
  PROVIDERS.push(
    alchemyProvider({
      apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    })
  )
}

if (env.NEXT_PUBLIC_INFURA_API_KEY) {
  if (!env.NEXT_PUBLIC_INFURA_API_KEY)
    throw new Error("NEXT_PUBLIC_INFURA_API_KEY is not defined")
  PROVIDERS.push(
    infuraProvider({
      apiKey: env.NEXT_PUBLIC_INFURA_API_KEY,
    })
  )
}

// Fallback to public provider
// Only include public provider if no other providers are available.
if (PROVIDERS.length === 0 || env.NEXT_PUBLIC_USE_PUBLIC_PROVIDER === "true") {
  PROVIDERS.push(publicProvider())
}

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  CHAINS,
  PROVIDERS
)
