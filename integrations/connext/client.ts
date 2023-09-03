import { create, SdkConfig } from "@connext/sdk"

import { mainnetChains, testnetChains } from "./utils/chains"

interface ProviderParams {
  chainId: string
  chainName: string
  rpcUrls: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls: string[]
}

interface Chain {
  id: string
  chain_id: number
  domain_id: string
  name: string
  short_name: string
  provider_params: ProviderParams[]
  rpc_urls: string[]
}

interface ChainObj {
  [key: string]: {
    providers: string[]
  }
}

function constructSdkChains(chains: Chain[]) {
  const chainsObj: ChainObj = {}

  chains.forEach((chain) => {
    chainsObj[chain.domain_id] = {
      providers: chain.provider_params[0].rpcUrls,
    }
  })

  return chainsObj
}

const testnetSdkConfig: SdkConfig = {
  network: "testnet",
  chains: constructSdkChains(testnetChains),
  logLevel: "silent",
}
const mainnetSdkConfig: SdkConfig = {
  network: "mainnet",
  chains: constructSdkChains(mainnetChains),
  logLevel: "silent",
}

export async function clients(address?: string) {
  const testnetSdk = await create({
    ...testnetSdkConfig,
    signerAddress: address,
  })
  const mainnetSdk = await create({
    ...mainnetSdkConfig,
    signerAddress: address,
  })

  return {
    testnetSdk,
    mainnetSdk,
  }
}
