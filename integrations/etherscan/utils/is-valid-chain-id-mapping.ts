export function isValidChainIdMapping(chain: number | string, validChainIds: number[]) {
  return validChainIds.includes(Number(chain))
}

export default isValidChainIdMapping
