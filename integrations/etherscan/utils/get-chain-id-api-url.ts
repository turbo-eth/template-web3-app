import { CHAIN_ID_API_URL_MAP, VALID_CHAIN_IDS } from "./constants"
import isValidChainIdApiUrl from "./is-valid-chain-id-mapping"

export function getChainIdApiUrl(chain: number) {
  if (!isValidChainIdApiUrl(chain, VALID_CHAIN_IDS)) {
    throw new Error(`Invalid Chain Id: ${chain}`)
  }
  return CHAIN_ID_API_URL_MAP[chain]
}

export default getChainIdApiUrl
