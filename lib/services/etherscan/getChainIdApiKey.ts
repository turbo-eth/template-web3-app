import { CHAIN_ID_API_KEY_MAP, VALID_CHAIN_IDS } from './constants'
import { isValidChainIdMapping } from './isValidChainIdMapping'

export function getChainIdApiKey(chain: number | string) {
  if (!isValidChainIdMapping(Number(chain), VALID_CHAIN_IDS)) {
    throw new Error(`Invalid Chain Id: ${chain}`)
  }
  return CHAIN_ID_API_KEY_MAP[Number(chain)] as string
}

export default getChainIdApiKey
