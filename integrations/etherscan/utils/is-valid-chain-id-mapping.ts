export function isValidChainIdMapping(chain: number | string, validChainIds: any) {
  return validChainIds.includes(chain)
}

export default isValidChainIdMapping
