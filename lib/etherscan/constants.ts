interface ChainIdToApi {
  [chainId: number]: string
}

// Etherscan Networks
// 1: Mainnet
// 3: Ropsten
// 4: Rinkeby
// 5: Goerli
// 42: Kovan
export const ETHEREUM_MAINNET_API_URL = 'https://api.etherscan.io'
export const ETHEREUM_ROPSTEN_API_URL = 'https://api-ropsten.etherscan.io'
export const ETHEREUM_RINKEBY_API_URL = 'https://api-rinkeby.etherscan.io'
export const ETHEREUM_GOERLI_API_URL = 'https://api-rinkeby.etherscan.io'
export const ETHEREUM_KOVAN_API_URL = 'https://api-kovan.etherscan.io'
export const ETHEREUM_NETWORK_NAME_API_URL_MAP = {
  mainnet: ETHEREUM_MAINNET_API_URL,
  kovan: ETHEREUM_KOVAN_API_URL,
  rinkeby: ETHEREUM_RINKEBY_API_URL,
  goerli: ETHEREUM_GOERLI_API_URL,
  ropsten: ETHEREUM_ROPSTEN_API_URL,
}

// Polygonscan Networks
// 137: Mainnet
// 80001: Mumbai
export const POLYGON_MAINNET_API_URL = 'https://api.polygonscan.com'
export const POLYGON_TESTNET_API_URL = 'https://api-testnet.polygonscan.com'
export const POLYGON_NETWORK_NAME_API_URL_MAP = {
  mainnet: POLYGON_MAINNET_API_URL,
  mumbai: POLYGON_TESTNET_API_URL,
}

// Snowtrace Networks
// 43114: Mainnet
// 43113: Fuji
export const AVALANCHE_MAINNET_API_URL = 'https://api.snowtrace.io'
export const AVALANCHE_TESTNET_API_URL = 'https://api-testnet.snowtrace.io'
export const AVALANCHE_NETWORK_NAME_API_URL_MAP = {
  mainnet: AVALANCHE_MAINNET_API_URL,
  fuji: AVALANCHE_TESTNET_API_URL,
}

export const CHAINID_API_URL_MAP: ChainIdToApi = {
  1: ETHEREUM_MAINNET_API_URL,
  2: ETHEREUM_ROPSTEN_API_URL,
  4: ETHEREUM_RINKEBY_API_URL,
  5: ETHEREUM_GOERLI_API_URL,
  42: ETHEREUM_KOVAN_API_URL,
  137: POLYGON_MAINNET_API_URL,
  80001: POLYGON_MAINNET_API_URL,
  43114: AVALANCHE_MAINNET_API_URL,
  43113: AVALANCHE_TESTNET_API_URL,
}

export const CHAINID_SERVICE_MAP: ChainIdToApi = {
  1: 'etherscan',
  2: 'etherscan',
  4: 'etherscan',
  5: 'etherscan',
  42: 'etherscan',
  137: 'polygonscan',
  80001: 'polygonscan',
  43114: 'snowtrace',
  43113: 'snowtrace',
}

export const VALID_CHAIN_IDS = Object.keys(CHAINID_API_URL_MAP).map((key) => parseInt(key))
export const VALID_API_URLS = Object.values(CHAINID_API_URL_MAP).map((key) => key)

export const VALID_SERVICE_PROVIDERS = ['etherscan', 'polygonscan', 'snowtrace']
