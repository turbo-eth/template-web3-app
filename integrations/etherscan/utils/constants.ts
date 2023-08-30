import { env } from "@/env.mjs"

interface ChainIdToApi {
  [chainId: number]: string | undefined
}

// Etherscan Networks
// 1: Mainnet
// 3: Ropsten
// 4: Rinkeby
// 5: Goerli
// 42: Kovan
// 11155111: Sepolia
export const ETHEREUM_MAINNET_API_URL = "https://api.etherscan.io"
export const ETHEREUM_ROPSTEN_API_URL = "https://api-ropsten.etherscan.io"
export const ETHEREUM_RINKEBY_API_URL = "https://api-rinkeby.etherscan.io"
export const ETHEREUM_GOERLI_API_URL = "https://api-goerli.etherscan.io"
export const ETHEREUM_KOVAN_API_URL = "https://api-kovan.etherscan.io"
export const ETHEREUM_SEPOLIA_API_URL = "https://api-sepolia.etherscan.io"
export const ETHEREUM_NETWORK_NAME_API_URL_MAP = {
  mainnet: ETHEREUM_MAINNET_API_URL,
  kovan: ETHEREUM_KOVAN_API_URL,
  rinkeby: ETHEREUM_RINKEBY_API_URL,
  goerli: ETHEREUM_GOERLI_API_URL,
  ropsten: ETHEREUM_ROPSTEN_API_URL,
  sepolia: ETHEREUM_SEPOLIA_API_URL,
}

// L2 Networks
// 10: Optimism
// 69: Optimism Kovan
// 420: Optimism Goerli
// 28528: Optimism Testnet
// 42161: Arbitrum
// 421611: Arbitrum Testnet
export const OPTIMISM_MAINNET_API_URL = "https://api-optimistic.etherscan.io/"
export const OPTIMISM_GOERLI_API_URL =
  "https://api-goerli-optimism.etherscan.io/"
export const OPTIMISM_KOVAN_API_URL = "https://api-kovan-optimism.etherscan.io/"
export const OPTIMISM_NETWORK_NAME_API_URL_MAP = {
  mainnet: OPTIMISM_MAINNET_API_URL,
  goerli: OPTIMISM_GOERLI_API_URL,
  kovan: OPTIMISM_KOVAN_API_URL,
}
export const ARBITRUM_MAINNET_API_URL = "https://api.arbiscan.io/"
export const ARBITRUM_NETWORK_NAME_API_URL_MAP = {
  mainnet: ARBITRUM_MAINNET_API_URL,
}

// Polygonscan Networks
// 137: Mainnet
// 80001: Mumbai
export const POLYGON_MAINNET_API_URL = "https://api.polygonscan.com"
export const POLYGON_TESTNET_API_URL = "https://api-testnet.polygonscan.com"
export const POLYGON_NETWORK_NAME_API_URL_MAP = {
  mainnet: POLYGON_MAINNET_API_URL,
  mumbai: POLYGON_TESTNET_API_URL,
}

export const CHAIN_ID_API_URL_MAP: ChainIdToApi = {
  1: ETHEREUM_MAINNET_API_URL,
  2: ETHEREUM_ROPSTEN_API_URL,
  4: ETHEREUM_RINKEBY_API_URL,
  5: ETHEREUM_GOERLI_API_URL,
  42: ETHEREUM_KOVAN_API_URL,
  137: POLYGON_MAINNET_API_URL,
  80001: POLYGON_MAINNET_API_URL,
  10: OPTIMISM_MAINNET_API_URL,
  420: OPTIMISM_GOERLI_API_URL,
  42161: ARBITRUM_MAINNET_API_URL,
  421613: ARBITRUM_MAINNET_API_URL,
}

const {
  ETHERSCAN_API_KEY,
  ETHERSCAN_API_KEY_OPTIMISM,
  ETHERSCAN_API_KEY_POLYGON,
  ETHERSCAN_API_KEY_ARBITRUM,
} = env

export const CHAIN_ID_API_KEY_MAP: ChainIdToApi = {
  1: ETHERSCAN_API_KEY,
  2: ETHERSCAN_API_KEY,
  4: ETHERSCAN_API_KEY,
  5: ETHERSCAN_API_KEY,
  42: ETHERSCAN_API_KEY,
  137: ETHERSCAN_API_KEY_POLYGON,
  80001: ETHERSCAN_API_KEY_POLYGON,
  10: ETHERSCAN_API_KEY_OPTIMISM,
  420: ETHERSCAN_API_KEY_OPTIMISM,
  42161: ETHERSCAN_API_KEY_ARBITRUM,
  421613: ETHERSCAN_API_KEY_ARBITRUM,
}

export const CHAIN_ID_SERVICE_MAP = {
  1: "etherscan",
  2: "etherscan",
  4: "etherscan",
  5: "etherscan",
  42: "etherscan",
  137: "polygonscan",
  80001: "polygonscan",
  10: "etherscan",
  420: "etherscan",
  42161: "arbiscan",
  421613: "arbiscan",
}

export const VALID_SERVICE_PROVIDERS = ["etherscan", "polygonscan", "arbiscan"]
export const VALID_CHAIN_IDS = Object.keys(CHAIN_ID_API_URL_MAP).map((key) =>
  parseInt(key)
)
export const VALID_API_URLS = Object.values(CHAIN_ID_API_URL_MAP).map(
  (key: string) => key
)
